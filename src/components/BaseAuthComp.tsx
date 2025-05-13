"use client";

import React, { useState } from "react";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "~/components/ui/button";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react"; // tRPC client hook
import { signIn } from "next-auth/react";

type Props = {
  type: "login" | "register";
};

export default function BaseAuthComp({ type }: Props) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState("");

  const registerMutation = api.auth.register.useMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setError("");
    try {
      if (type === "register") {
        await registerMutation.mutateAsync({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        router.push("/login");
      } else {
        const res = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (res?.error) {
          setError("Invalid credentials");
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      setError("Something went wrong.");
    }
  };

  return (
    <div className="max-w-sm mx-auto space-y-4">
      {type === "register" && (
        <div>
          <Label>Name</Label>
          <Input name="name" value={formData.name} onChange={handleChange} />
        </div>
      )}
      <div>
        <Label>Email</Label>
        <Input name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div>
        <Label>Password</Label>
        <Input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <Button onClick={handleSubmit}>
        {type === "register" ? "Register" : "Login"}
      </Button>
    </div>
  );
}
