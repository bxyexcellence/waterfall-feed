import Feed from "./components/Feed"
import "./App.css"

function App() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50 overflow-hidden">
      <div className="w-full max-w-md mx-auto h-screen flex flex-col overflow-hidden">
        <div className="flex-1 overflow-hidden">
          <Feed />
        </div>
      </div>
    </main>
  )
}

export default App
