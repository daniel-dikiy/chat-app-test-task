<script lang="ts">
  import logo from '$lib/images/logo.svg';
  import addUserIcon from '$lib/images/addUserIcon.svg';
  import AddUserModal from 'routes/AddUserModal.svelte';
  import type { UserID, UserName, Message } from 'routes/+page';
  import { afterUpdate, beforeUpdate, onMount } from 'svelte';
  import { supabase } from 'src/lib/client/supabaseClient.js';

  let inputOfMessage: HTMLInputElement;
  let containerOfMessages: HTMLDivElement;

  let shouldScroll: Boolean = false;
  let showAddUser: Boolean = false;

  let urlParams = null;
  let currentUserId: UserID;
  let currentUserName: UserName;

  let messages: Message[] = [];

  const openAddUserModal = () => {
    showAddUser = true;
  };

  const closeAddUserModal = () => {
    showAddUser = false;
  };

  const setCurrentUser = async (name: UserName) => {
    const data = await addUser(name);
    closeAddUserModal();
    currentUserId = data.id;
    currentUserName = data.name;
  };

  const setNewUser = async (name: UserName) => {
    const data = await addUser(name);
    closeAddUserModal();
    const newUserId = data.id;
    const newUsername = data.name;

    const newWindow = window.open(
      `${window.location.pathname}?userId=${newUserId}&username=${newUsername}`,
      '_blank',
    );
    newWindow && newWindow.focus();
  };

  const addUser = async (name: UserName) => {
    if (name) {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();

      return result;
    }
  };

  const addMessage = (text: string, user_id: UserID, username: UserName) => {
    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, user_id, username }),
    });
  };

  const sendMessage = async () => {
    if (inputOfMessage.value && currentUserId && currentUserName) {
      const newMessage = inputOfMessage.value;

      addMessage(newMessage, currentUserId, currentUserName);

      inputOfMessage.value = '';

      inputOfMessage.focus();
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const getStyleOfMessage = (index: number, message: Message) => {
    let className = 'msg';

    className += getStyleFromCurrentUser(message.user_id);

    className +=
      isFirstMessage(index) || isDiffPrevUser(index, message.user_id)
        ? ' rounded-tl-2xl'
        : ' rounded-tl-md';

    className +=
      isLastMessage(index, messages.length) ||
      isDiffNextUser(index, message.user_id)
        ? ' rounded-bl-2xl'
        : ' rounded-bl-md';

    return className;
  };

  const getStyleFromCurrentUser = (id: UserID) => {
    return id === currentUserId ? ' msg msg-outgoing' : ' msg msg-incoming';
  };

  const isFirstMessage = (index: number) => {
    return index === 0;
  };

  const isLastMessage = (index: number, length: number) => {
    return index + 1 === length;
  };

  const isDiffNextUser = (index: number, id: UserID) => {
    return index !== 0 && id !== messages[index + 1].user_id;
  };

  const isDiffPrevUser = (index: number, id: UserID) => {
    return index !== 0 && id !== messages[index - 1].user_id;
  };

  const isCurrentUser = (id: UserID) => {
    return currentUserId === id;
  };

  beforeUpdate(() => {
    urlParams = new URLSearchParams(window.location.search);
    const userIdParam = urlParams.get('userId');
    const usernameParam = urlParams.get('username');

    if (!userIdParam && !currentUserId) {
      openAddUserModal();
    }

    if (userIdParam && usernameParam && !currentUserId) {
      currentUserId = parseInt(userIdParam);
      currentUserName = usernameParam;
    }
    shouldScroll = true;
  });

  onMount(() => {
    const loadMessages = async () => {
      const response = await fetch('/api/messages', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const result = await response.json();
      messages = result;
    };

    const setupSubscription = () => {
      const messageSubscription = supabase
        .channel('messages')
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          payload => {
            const newMessage = payload.new as Message;

            const createdAt = new Date(newMessage.created_at);
            const hours = createdAt.getHours().toString().padStart(2, '0');
            const minutes = createdAt.getMinutes().toString().padStart(2, '0');
            const formattedTime = `${hours}:${minutes}`;
            newMessage.time = formattedTime;

            messages = [...messages, newMessage];
            shouldScroll = true;
          },
        )
        .subscribe();

      return () => {
        supabase.removeChannel(messageSubscription);
      };
    };

    loadMessages();

    return setupSubscription();
  });

  afterUpdate(() => {
    if (shouldScroll && containerOfMessages) {
      containerOfMessages.scrollTop = containerOfMessages.scrollHeight;
      shouldScroll = false;
    }
  });
</script>

<div class="chat">
  <div class="chat-body" bind:this={containerOfMessages}>
    <div class="chat-body-content">
      {#if currentUserId}
        {#each messages as message, index (message.id)}
          <div class={getStyleOfMessage(index, message)}>
            {#if !isCurrentUser(message.user_id) && (isFirstMessage(index) || isDiffPrevUser(index, message.user_id))}
              <p class="msg-username">{message.username}</p>
            {/if}

            <div class="msg-content">
              <p class="msg-content-text">{message.text}</p>
              <p class="msg-content-time">{message.time}</p>
            </div>
          </div>
        {/each}
      {/if}
    </div>
  </div>

  <div class="chat-field">
    <div class="chat-field-button chat-field-button-addUser">
      <button on:click={openAddUserModal}>
        <img src={addUserIcon} alt="Add user in chat" />
      </button>
    </div>
    <input
      type="text"
      bind:this={inputOfMessage}
      on:keydown={handleKeyDown}
      placeholder="Enter a message..."
    />
    <div class="chat-field-button chat-field-button-sendMessage">
      <button on:click={sendMessage}>
        <img src={logo} alt="Send message" />
      </button>
    </div>
  </div>

  {#if showAddUser === true}
    <AddUserModal
      closeModal={closeAddUserModal}
      actionModal={!currentUserId ? setCurrentUser : setNewUser}
    />
  {/if}
</div>
