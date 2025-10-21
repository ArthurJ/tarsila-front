"use client";

import { useEffect, useState } from "react";
import { useLoader } from "../contexts/LoaderProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useDialog } from "../contexts/DialogsProvider";
import { useHistory } from "../contexts/HistoryProvider";
import ProtectedRoute from "../auth/ProtectedRoute";
import {
  startChat,
  Conversation,
} from "../services/services";
import Chat from "../components/chat/chat";
import Draft from "../components/draft/draft";

export default function ChatPage() {
  let renderAfterCalled = false;
  const [isMobile, setIsMobile] = useState<boolean>(true);
  const [showResult, setShowResult] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { currentChatId } = useHistory();
  const { showLoader, hideLoader } = useLoader();
  const { setDialogs } = useDialog();

  const chatId = currentChatId ? currentChatId : null;

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 980);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!renderAfterCalled) {
      showLoader();
      if (!!currentUser && currentUser.email) {
        startChat(currentUser.email, chatId)
          .then((data) => {
            setDialogs((data as Conversation).history);
          })
          .finally(() => hideLoader());
      }
      renderAfterCalled = true;
    }
  }, []);

  return (
    <ProtectedRoute>
      <main className="relative bg-verde-oliva-claro flex p-2 h-screen md:p-4">
        <div
          className={`
            relative flex transition-transform duration-[800ms] ease-in-out
            ${showResult ? '-translate-x-[calc(98vw-32px)]' : 'translate-x-0'}
            md:w-full
          `}
        >
          {/* Draft Panel */}
          <div className="relative w-[calc(98vw-16px)] h-full flex-shrink-0 overflow-y-auto md:w-[35%]">
            <div className="h-full">
              <Draft />
            </div>
          </div>

          {/* Chat Panel */}
          <div className="relative w-[calc(98vw-16px)] h-full flex-shrink-0 overflow-y-auto md:w-[calc(65%-16px)] md:ml-4">
            <div className="h-full">
              <Chat />
            </div>
          </div>
        </div>

        {isMobile && (
          <button
            className={`
              absolute z-10 w-[200px] transition-all duration-[800ms] ease-in-out
              bg-verde-oliva-claro hover:bg-verde-oliva-escuro
              text-marfim font-medium rounded-md px-10 py-2
              ${
                showResult
                  ? 'top-20 left-[calc(98vw-24px)]'
                  : 'top-[calc(100vh-80px)] left-[calc(100vw-200px-8px)]'
              }
            `}
            onClick={() => setShowResult((prev) => !prev)}
          >
            {showResult ? "< ver o resultado" : "voltar ao chat >"}
          </button>
        )}
      </main>
    </ProtectedRoute>
  );
}