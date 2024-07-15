<script lang="ts">
  import addUserIcon from '$lib/images/addUserIcon.svg';
  import { onMount } from 'svelte';

  export let closeModal: () => void;
  export let actionModal: (username: string) => void;

  let inputOfUsername: HTMLInputElement;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      actionModal(inputOfUsername.value);
    }
  };

  onMount(() => {
    inputOfUsername.focus();
  });
</script>

<div
  class="relative z-10"
  aria-labelledby="modal-title"
  role="dialog"
  aria-modal="true"
>
  <div
    class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
    aria-hidden="true"
  ></div>

  <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
    <div
      class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
    >
      <div
        class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
      >
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-center">
            <div
              class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
            >
              <img src={addUserIcon} alt="Add user in chat" />
            </div>
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <h3
                class="text-base font-semibold leading-6 text-gray-900"
                id="modal-title"
              >
                Add user
              </h3>
              <div class="mt-2">
                <input
                  class="w-full"
                  type="text"
                  bind:this={inputOfUsername}
                  on:keydown={handleKeyDown}
                  placeholder="Enter a user name..."
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            class="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
            on:click={() => actionModal(inputOfUsername.value)}>Add user</button
          >
          <button
            type="button"
            class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            on:click={closeModal}>Cancel</button
          >
        </div>
      </div>
    </div>
  </div>
</div>
