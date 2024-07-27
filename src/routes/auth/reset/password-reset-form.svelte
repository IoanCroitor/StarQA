<script lang="ts">
  import * as Form from '$lib/components/ui/form'
  import { Input } from '$lib/components/ui/input'
  import { toast } from 'svelte-sonner'
  import {
    superForm,
    type Infer,
    type SuperValidated,
  } from 'sveltekit-superforms'
  import { zodClient } from 'sveltekit-superforms/adapters'
  import {
    passwordResetSchema,
    type PasswordResetSchema,
  } from '$lib/config/zod-schema'
  import Spinner from '@/assets/Spinner.svelte'
  import * as m from '$lib/paraglide/messages'

  function handleErrorToast(status: number, error: string) {
    toast.error(error, {
      description: 'Code: ' + status,
      action: {
        label: 'Close',
        onClick: () =>
          console.info(
            'Closed message: ' + error + ' with the status: ' + status,
          ),
      },
    })
  }

  export let data: SuperValidated<Infer<PasswordResetSchema>>

  const form = superForm(data, {
    validators: zodClient(passwordResetSchema),
  })

  const { form: formData, enhance, delayed, message } = form

  message.subscribe((value) => {
    if (value) {
      handleErrorToast(value.status, value.message)
    }
  })
</script>

<div class="grid gap-2">
  <form
    method="POST"
    use:enhance
    action="?/formSubmit"
    class="w-full grid gap-1"
  >
    <!-- Email -->
    <Form.Field {form} name="email">
      <Form.Control let:attrs>
        <Form.Label class="font-semibold">{m.email()}</Form.Label>
        <Input
          disabled={$delayed}
          autocapitalize="none"
          autocomplete="email"
          autocorrect="off"
          {...attrs}
          bind:value={$formData.email}
          type="email"
          placeholder={m.enter_your_email()}
        />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <Form.Button class="self-start mt-1" size="sm" disabled={$delayed}>
      {#if $delayed}
        <Spinner />
      {:else}
        {m.reset_password()}
      {/if}
    </Form.Button>
  </form>
</div>
