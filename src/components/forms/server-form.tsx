"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { generateRegionInfo, openApp } from "@/lib/imposter";
import { toast } from "sonner";
import SharableLink from "./sharable-link";

export type FormData = {
  protocol: "http" | "https";
  address: string;
  port: string;
  name: string;
};

export function ServerForm() {
  const { register, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      protocol: "http",
      port: "22023",
      name: "Impostor",
    },
  });

  const onSubmit = (data: FormData) => {
    const serverInfo = {
      protocol: data.protocol,
      address: data.address,
      port: parseInt(data.port),
      name: data.name,
      url: `${data.protocol}://${data.address}`,
    };

    const json = generateRegionInfo(serverInfo);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "regionInfo.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Server file downloaded", {
      description: "The regionInfo.json file has been downloaded successfully.",
    });
  };

  const handleOpenApp = () => {
    const data = watch();
    openApp(data);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Configuration</CardTitle>
        <CardDescription>
          Enter your Among Us private server details below
        </CardDescription>
      </CardHeader>
      <CardContent>
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="protocol">Protocol</Label>
                <Select defaultValue="http" {...register("protocol")}>
                  <SelectTrigger id="protocol">
                    <SelectValue placeholder="Protocol" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="http">http://</SelectItem>
                    <SelectItem value="https">https://</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="address">Server Address</Label>
                <Input
                  id="address"
                  {...register("address")}
                  placeholder="Server address"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="port">Port</Label>
                <Input
                  id="port"
                  {...register("port")}
                  placeholder="Port"
                  type="number"
                  min="1"
                  max="65535"
                  required
                />
              </div>
              <div>
                <Label htmlFor="name">Server Name</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Server name"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button type="submit" className="w-full">
              Download server file
            </Button>
            <Button type="button" onClick={handleOpenApp} className="w-full">
              Open in Among Us
            </Button>
            <SharableLink watch={watch} />
          </div>
        </motion.form>
      </CardContent>
    </Card>
  );
}
