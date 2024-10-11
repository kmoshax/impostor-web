"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function Instructions() {
  const [platform, setPlatform] = useState("desktop");

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (/android/.test(userAgent)) {
      setPlatform("android");
    } else if (/iphone|ipad|ipod/.test(userAgent)) {
      setPlatform("ios");
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Instructions</CardTitle>
        <CardDescription>fast setup instructions</CardDescription>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs defaultValue={platform} onValueChange={setPlatform}>
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="desktop">Desktop</TabsTrigger>
              <TabsTrigger value="android">Android</TabsTrigger>
              <TabsTrigger value="ios">iOS</TabsTrigger>
            </TabsList>
            <AnimatePresence mode="wait">
              <motion.div
                key={platform}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="desktop" className="space-y-4">
                  <ol className="list-decimal list-inside space-y-2">
                    <li>
                      Type the server IP and click the button &quot;Download server
                      file&quot;.
                    </li>
                    <li>
                      Make sure that the file is named{" "}
                      <code className="bg-muted px-1 py-0.5 rounded">
                        regionInfo.json
                      </code>{" "}
                      and doesn't have additional numbers.
                    </li>
                    <li>
                      Press{" "}
                      <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
                        Win
                      </kbd>{" "}
                      +{" "}
                      <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
                        R
                      </kbd>{" "}
                      on your keyboard and paste:
                      <code className="block mt-2 p-2 bg-muted rounded">
                        %APPDATA%\..\LocalLow\Innersloth\Among Us
                      </code>
                    </li>
                    <li>
                      Press{" "}
                      <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg">
                        Enter
                      </kbd>{" "}
                      or click "OK".
                    </li>
                    <li>
                      Copy the downloaded file and paste it in the opened
                      folder.
                    </li>
                    <li>
                      You can now play on your server by opening Among Us and
                      clicking "Online".
                    </li>
                  </ol>
                  <p className="mt-4">
                    To switch back to the original servers, change the region in
                    the bottom right corner.
                  </p>
                </TabsContent>
                <TabsContent value="android" className="space-y-4">
                  <p>
                    To play on a private server, fill in the form, then click
                    "Open in Among Us". You can then switch to your server using
                    the Region Selection menu in the bottom right corner.
                  </p>
                  <p>
                    You may get a confirmation prompt from your browser to
                    confirm that you want to open Among Us, which you should
                    accept. If the region doesn't show up, keep the game running
                    in the background and click the button again.
                  </p>
                  <p className="mt-2 font-semibold pl-2 border-l-2">
                    Note for server admins: to support mobile phones, you need
                    to support connecting over HTTPS.
                  </p>
                </TabsContent>
                <TabsContent value="ios" className="space-y-4">
                  <p>
                    To play on a private server, fill in the form, then click
                    "Open in Among Us". You can then switch to your server using
                    the Region Selection menu in the bottom right corner.
                  </p>
                  <p>
                    You may get a confirmation prompt from your browser to
                    confirm that you want to open Among Us, which you should
                    accept. If the region doesn't show up, keep the game running
                    in the background and click the button again.
                  </p>
                  <p className="mt-2 font-semibold pl-2 border-l-2">
                    Note for server admins: to support mobile phones, you need
                    to support connecting over HTTPS.
                  </p>
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </motion.div>
      </CardContent>
    </Card>
  );
}
