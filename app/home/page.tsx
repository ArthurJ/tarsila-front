"use client";

import { useCallback, useEffect } from "react";
import ProtectedRoute from "../auth/ProtectedRoute";
import { useLoader } from "../contexts/LoaderProvider";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthProvider";
import { getPastChats, PastChats } from "../services/services";
import { useHistory } from "../contexts/HistoryProvider";
import Button from "../components/ui/Button";

export default function Home() {
  const { push } = useRouter();
  const { showLoader, hideLoader } = useLoader();
  const { isAuthenticated, currentUser } = useAuth();
  const { updateChatsList, updateChatId, chatsList } = useHistory();

  const loadChatList = useCallback(() => {
    if (!!currentUser && currentUser.email) {
      getPastChats(currentUser.email)
        .then((data) => {
          const pastChats = data as PastChats
          if (pastChats.chats.length > 0) {
            updateChatsList(pastChats.chats);
          }
        })
    }
  }, [currentUser])
        
  useEffect(() => {
    showLoader();
    if (!isAuthenticated) {
      push("/login");
    } else {
      loadChatList();
    }
    hideLoader();
  }, []);
  
  function startNewChat () {
    updateChatId(new Date().getTime().toString());
    push("/chat");
  }
  
  function loadLastChat () {
    if (chatsList.length > 0) {
      updateChatId(chatsList[0].chat_id);
      push("/chat");
    }
  }

  return (
    <ProtectedRoute>
      <main className="flex flex-col items-center justify-center gap-[1rem] h-full">
        <Button onClick={startNewChat}>Criar novo</Button>
        <Button onClick={loadLastChat}>Continuar</Button>
      </main>
    </ProtectedRoute>
  );
}
