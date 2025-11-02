"use client";

import { useCallback, useEffect, useState } from "react";
import { useLoader } from "../contexts/LoaderProvider";
import { useAuth } from "../contexts/AuthProvider";
import { useDialog } from "../contexts/DialogsProvider";
import { useHistory } from "../contexts/HistoryProvider";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../auth/ProtectedRoute";
import {
  startChat,
  getPastChats,
  Conversation,
  PastChats,
} from "../services/services";
import Chat from "../components/chat/chat";
import Draft from "../components/draft/draft";
import Button from "../components/ui/Button";

export default function ChatPage() {
  let renderAfterCalled = false;
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showChatModal, setShowChatModal] = useState<boolean>(false);
  const { push } = useRouter();
  const { currentUser, isAuthenticated } = useAuth();
  const { currentChatId, updateChatsList, updateChatId, chatsList } = useHistory();
  const { showLoader, hideLoader } = useLoader();
  const { setDialogs } = useDialog();

  const chatId = currentChatId ? currentChatId : null;

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
  }, [currentUser, updateChatsList]);

  useEffect(() => {
    if (!renderAfterCalled) {
      showLoader();
      
      if (!isAuthenticated) {
        push("/");
        hideLoader();
        return;
      }

      if (!!currentUser && currentUser.email) {
        loadChatList();
        
        if (!chatId) {
          setShowChatModal(true);
          hideLoader();
        } else {
          startChat(currentUser.email, chatId)
            .then((data) => {
              setDialogs((data as Conversation).history);
            })
            .finally(() => hideLoader());
        }
      }
      renderAfterCalled = true;
    }
  }, [isAuthenticated, currentUser, chatId, push, loadChatList, showLoader, hideLoader, setDialogs]);

  function startNewChat() {
    const newChatId = new Date().getTime().toString();
    updateChatId(newChatId);
    setShowChatModal(false);
    
    showLoader();
    if (!!currentUser && currentUser.email) {
      startChat(currentUser.email, newChatId)
        .then((data) => {
          setDialogs((data as Conversation).history);
        })
        .finally(() => hideLoader());
    }
  }
  
  function loadLastChat() {
    if (chatsList.length > 0) {
      const lastChatId = chatsList[0].chat_id;
      updateChatId(lastChatId);
      setShowChatModal(false);
      
      showLoader();
      if (!!currentUser && currentUser.email) {
        startChat(currentUser.email, lastChatId)
          .then((data) => {
            setDialogs((data as Conversation).history);
          })
          .finally(() => hideLoader());
      }
    }
  }

  const hasChats = chatsList.length > 0;

  return (
    <ProtectedRoute>
      <main className="relative bg-verde-oliva-claro flex p-4">
        {/* Chat Modal */}
        {showChatModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div 
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setShowChatModal(false)}
            />
            
            {/* Modal Content */}
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 mx-4 max-w-md w-full transform transition-all">

              {/* Modal Header */}
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-marrom-carvao mb-2">
                  Bem-vindo à Tarsila
                </h2>
                <p className="text-verde-oliva-escuro">
                  Escolha como você gostaria de começar
                </p>
              </div>

              {/* Modal Actions */}
              <div className="space-y-4">
                <Button 
                  onClick={startNewChat}
                  size="lg"
                  className="w-full"
                >
                  Criar novo projeto
                </Button>
                
                {hasChats && (
                  <Button 
                    onClick={loadLastChat}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    Continuar último projeto
                  </Button>
                )}                
                {!hasChats && (
                  <div className="text-center text-sm text-verde-oliva-escuro">
                    Você ainda não tem projetos salvos
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Main Chat Interface */}
        <div
          className={`
            relative flex flex-col transition-transform duration-[800ms] ease-in-out
            ${showResult ? '-translate-x-[calc(98vw-32px)]' : 'translate-x-0'}
            md:w-full md:flex-row
            ${showChatModal ? 'pointer-events-none opacity-30' : ''}
          `}
        >
          {/* Draft Panel */}
          <div className="relative h-[calc(60vh-56px)] flex-shrink-0 overflow-y-auto gap-y-2 md:w-[35%] md:h-[calc(100vh-80px)]">
            <Draft />
          </div>
          {/* Chat Panel */}
          <div className="relative h-[calc(40vh-40px)] flex-shrink-0 overflow-y-auto gap-y-2 md:w-[calc(65%-16px)] md:h-[calc(100vh-80px)] md:ml-4 mt-4 md:mt-0">
            <Chat />
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}