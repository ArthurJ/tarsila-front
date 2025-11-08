"use client";

import { useCallback, useEffect, useState, useRef } from "react";
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
import { useDraft } from "../contexts/DraftProvider";

export default function ChatPage() {
  const renderAfterCalled = useRef(false);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [showChatModal, setShowChatModal] = useState<boolean>(false);
  const { push } = useRouter();
  const { currentUser, isAuthenticated } = useAuth();
  const { currentChatId, updateChatsList, updateChatId, chatsList } = useHistory();
  const { showLoader, hideLoader } = useLoader();
  const { setDialogs } = useDialog();
  const { setDrafts } = useDraft();

  const loadChatList = useCallback(() => {
    if (currentUser?.email) {
      return getPastChats(currentUser.email)
        .then((data) => {
          const pastChats = data as PastChats;
          if (pastChats.chats.length > 0) {
            updateChatsList(pastChats.chats);
          }
        })
        .catch((error) => {
          console.error("Error loading chat list:", error);
        });
    }
    return Promise.resolve();
  }, [currentUser?.email, updateChatsList]);

  const initializeChat = useCallback(async () => {
    if (!isAuthenticated) {
      push("/");
      return;
    }

    if (!currentUser?.email) {
      hideLoader();
      return;
    }

    try {
      await loadChatList();
      
      if (!currentChatId) {
        setShowChatModal(true);
      } else {
        const data = await startChat(currentUser.email, currentChatId);
        setDialogs((data as Conversation).history);
        setDrafts([(data as Conversation).draft])
      }
    } catch (error) {
      console.error("Error initializing chat:", error);
      setShowChatModal(true);
    } finally {
      hideLoader();
    }
  }, [isAuthenticated, currentUser?.email, currentChatId, push, loadChatList, setDialogs, hideLoader]);

  useEffect(() => {
    if (renderAfterCalled.current) return;
    
    renderAfterCalled.current = true;
    showLoader();
    initializeChat();
  }, [showLoader, initializeChat]);

  function startNewChat() {
    const newChatId = new Date().getTime().toString();
    setShowChatModal(false);
    showLoader();
    
    updateChatId(newChatId);
    
    if (currentUser?.email) {
      startChat(currentUser.email, newChatId)
        .then((data) => {
          setDialogs((data as Conversation).history);
          setDrafts([(data as Conversation).draft])
        })
        .catch((error) => {
          console.error("Erro iniciando chat:", error);
          updateChatId(null);
          setShowChatModal(true);
        })
        .finally(() => hideLoader());
    }
  }
  
  function loadLastChat() {
    if (chatsList.length > 0) {
      const lastChatId = chatsList[0].chat_id;
      setShowChatModal(false);
      showLoader();
      
      updateChatId(lastChatId);
      
      if (currentUser?.email) {
        startChat(currentUser.email, lastChatId)
          .then((data) => {
            setDialogs((data as Conversation).history);
            setDrafts([(data as Conversation).draft])
          })
          .catch((error) => {
            console.error("Erro carregando ultimo chat:", error);
            updateChatId(null);
            setShowChatModal(true);
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