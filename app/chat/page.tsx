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
  const [showResult, setShowResult] = useState<boolean>(false);
  const { currentUser } = useAuth();
  const { currentChatId } = useHistory();
  const { showLoader, hideLoader } = useLoader();
  const { setDialogs } = useDialog();

  const chatId = currentChatId ? currentChatId : null;

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
      <main className="relative bg-verde-oliva-claro flex p-4">
        <div
          className={`
            relative flex flex-col transition-transform duration-[800ms] ease-in-out
            ${showResult ? '-translate-x-[calc(98vw-32px)]' : 'translate-x-0'}
            md:w-full md:flex-row
          `}
        >
          {/* Draft Panel */}
          <div className="relative h-[calc(60vh-56px)] flex-shrink-0 overflow-y-auto gap-y-2 md:w-[35%] md:h-[calc(100vh-80px)]">
            <Draft />
          </div>
          {/* Chat Panel */}
          <div className="relative  h-[calc(40vh-40px)] flex-shrink-0 overflow-y-auto gap-y-2 md:w-[calc(65%-16px)] md:h-[calc(100vh-80px)] md:ml-4 mt-4 md:mt-0">
            <Chat />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}