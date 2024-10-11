"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useState, useEffect, useCallback } from "react";
import { Copy, Laptop, LinkIcon, Smartphone, Tablet } from "lucide-react";
import { toast } from "sonner";
import { Input } from "../ui/input";
import { FormData } from "./server-form";
import { UseFormWatch } from "react-hook-form";

type SharePlatform = "desktop" | "android" | "ios";

const SharableLink = ({ watch }: { watch: UseFormWatch<FormData> }) => {
  const data = watch();
  const [shareableUrl, setShareableUrl] = useState("");
  const [sharePlatform, setSharePlatform] = useState<SharePlatform>("desktop");
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!data?.address) {
      setShareableUrl("");
      return;
    }

    const serverInfo = btoa(JSON.stringify(data));
    const url = `${window.location.origin}/share?type=${sharePlatform}&serverInfo=${serverInfo}`;
    setShareableUrl(url);
  }, [data, sharePlatform]);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(shareableUrl);
    toast.success("Link copied", {
      description: "The shareable link has been copied to your clipboard.",
    });
  }, [shareableUrl]);

  const handleOpen = useCallback(() => {
    if (data?.address.length < 1) {
      setIsOpen(false);
      toast.error("You must enter your server address");
      return;
    }
    setIsOpen(true);
  }, [data]);

  const ShareContent = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {["desktop", "android", "ios"].map((platform) => (
          <Button
            key={platform}
            variant={sharePlatform === platform ? "default" : "outline"}
            className="flex flex-col items-center justify-center h-24"
            onClick={() => setSharePlatform(platform as SharePlatform)}
          >
            {platform === "desktop" && <Laptop className="h-8 w-8 mb-2" />}
            {platform === "android" && <Smartphone className="h-8 w-8 mb-2" />}
            {platform === "ios" && <Tablet className="h-8 w-8 mb-2" />}
            {platform}
          </Button>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <Input value={shareableUrl} readOnly className="flex-grow" />
        <Button onClick={copyToClipboard} size="icon">
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {isDesktop ? (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button
              size="icon"
              onClick={handleOpen}
              variant="ghost"
              className="justify-self-end"
            >
              <LinkIcon />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Sharable Link</DialogTitle>
            </DialogHeader>
            <ShareContent />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerTrigger asChild>
            <Button type="button" onClick={handleOpen} className="w-full">
              Create sharable link
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Sharable Link</DrawerTitle>
            </DrawerHeader>
            <div className="p-4">
              <ShareContent />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default SharableLink;
