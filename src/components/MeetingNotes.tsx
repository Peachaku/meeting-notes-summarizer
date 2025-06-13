import { useState } from 'react'

const MeetingNotes = () => {
  const [notes, setNotes] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [summary, setSummary] = useState<string | null>(null)
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  const mockSummaries = [
    {
      mainPoints: [
        "Team discussed Q1 performance metrics",
        "New product launch scheduled for April",
        "Budget allocation approved for marketing campaign"
      ],
      actionItems: [
        "Schedule follow-up meeting for next week",
        "Prepare detailed budget breakdown",
        "Update project timeline"
      ],
      nextSteps: "Team to review and provide feedback by Friday"
    },
    {
      mainPoints: [
        "Project timeline review completed",
        "Resource allocation needs adjustment",
        "Client feedback incorporated into design"
      ],
      actionItems: [
        "Update resource allocation by EOD",
        "Send revised timeline to stakeholders",
        "Schedule design review session"
      ],
      nextSteps: "Follow up with client on design changes"
    },
    {
      mainPoints: [
        "Quarterly goals review completed",
        "Team performance metrics discussed",
        "New collaboration tools approved"
      ],
      actionItems: [
        "Implement new collaboration tools",
        "Set up training sessions",
        "Review individual performance goals"
      ],
      nextSteps: "Schedule tool training sessions"
    }
  ]

  // Placeholder function for LLM integration
  const generateLLMSummary = async (text: string): Promise<string> => {
    // TODO: Replace with actual LLM API call
    // Example structure for future implementation:
    // const response = await fetch('YOUR_LLM_API_ENDPOINT', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': 'Bearer YOUR_API_KEY'
    //   },
    //   body: JSON.stringify({
    //     text: text,
    //     max_tokens: 500,
    //     temperature: 0.7
    //   })
    // });
    // const data = await response.json();
    // return data.summary;

    // For now, return a mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomSummary = mockSummaries[Math.floor(Math.random() * mockSummaries.length)]
        resolve(JSON.stringify(randomSummary, null, 2))
      }, 2000)
    })
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value)
    setSummary(null)
  }

  const handleCopyToClipboard = async () => {
    if (!summary) return

    try {
      await navigator.clipboard.writeText(summary)
      setCopyStatus('copied')
      // Reset copy status after 2 seconds
      setTimeout(() => setCopyStatus('idle'), 2000)
    } catch (err) {
      setCopyStatus('error')
      // Reset error status after 2 seconds
      setTimeout(() => setCopyStatus('idle'), 2000)
    }
  }

  const handleSummarize = async () => {
    setIsProcessing(true)
    setSummary(null)
    setCopyStatus('idle')

    try {
      const result = await generateLLMSummary(notes)
      setSummary(result)
    } catch (error) {
      console.error('Error generating summary:', error)
      setSummary('Error generating summary. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white mb-4 sm:mb-6">Meeting Notes</h2>
        <div className="space-y-4 sm:space-y-6">
          <textarea
            value={notes}
            onChange={handleNotesChange}
            placeholder="Paste your meeting notes here..."
            className="w-full h-48 sm:h-64 lg:h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-base sm:text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            disabled={isProcessing}
          />
          
          <div className="flex justify-between items-center">
            <div className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
              <span>{notes.length} characters</span>
            </div>
            <div className="space-x-4">
              <button
                onClick={() => {
                  setNotes('')
                  setSummary(null)
                  setCopyStatus('idle')
                }}
                className="px-4 py-2 text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white disabled:opacity-50"
                disabled={isProcessing}
              >
                Clear
              </button>
              <button
                onClick={handleSummarize}
                disabled={isProcessing || !notes.trim()}
                className="px-6 py-2 text-sm sm:text-base font-medium text-white bg-blue-600 dark:bg-blue-500 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Processing...</span>
                  </>
                ) : (
                  'Summarize'
                )}
              </button>
            </div>
          </div>
        </div>
        {isProcessing && (
          <div className="mt-4 sm:mt-6 text-sm sm:text-base text-gray-600 dark:text-gray-400 text-center">
            Processing your meeting notes...
          </div>
        )}
        
        {summary && (
          <div className="mt-6 sm:mt-8 border-t border-gray-200 dark:border-gray-700 pt-6 sm:pt-8">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-white">Summary</h3>
              <button
                onClick={handleCopyToClipboard}
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 flex items-center space-x-2 transition-colors"
              >
                {copyStatus === 'copied' ? (
                  <>
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Copied!</span>
                  </>
                ) : copyStatus === 'error' ? (
                  <>
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    <span>Failed to copy</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                    </svg>
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 sm:p-6">
              <pre className="text-sm sm:text-base text-gray-700 dark:text-gray-300 whitespace-pre-wrap font-mono">
                {summary}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MeetingNotes 