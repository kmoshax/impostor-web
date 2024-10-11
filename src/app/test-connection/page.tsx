'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { testServerConnection } from '@/lib/imposter'

export default function TestConnection() {
  const [serverUrl, setServerUrl] = useState('')
  const [testResult, setTestResult] = useState<string | null>(null)

  const handleTest = async () => {
    try {
      const result = await testServerConnection(serverUrl)
      setTestResult(result ? 'Connection successful!' : 'Connection failed.')
    } catch (_) {
      setTestResult('Error testing connection.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center"
      >
        Test Server Connection
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-md mx-auto space-y-4"
      >
        <Input
          
          type="text"
          placeholder="Enter server URL"
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
        <Button onClick={handleTest} className="w-full">
          Test Connection
        </Button>
        {testResult && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`text-center ${
              testResult.includes('successful') ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {testResult}
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}