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
  import { loginSchema, type LoginSchema } from '$lib/config/zod-schema'
  import Spinner from '@/assets/Spinner.svelte'
  import * as m from '$lib/paraglide/messages'
  import { handleToast } from '@/handleToast'

  export let data: SuperValidated<Infer<LoginSchema>>

  const form = superForm(data, {
    validators: zodClient(loginSchema),
  })

  const { form: formData, enhance, delayed, message } = form

  message.subscribe((value) => {
    if (value) {
      handleToast('error', value.status, value.message)
    }
  })
</script>

<svelte:head>
  <title>{m.login_portal()}</title>
</svelte:head>

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
          placeholder="Enter your email"
        />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <!-- Password -->
    <Form.Field {form} name="password">
      <Form.Control let:attrs>
        <Form.Label class="font-semibold">{m.password()}</Form.Label>
        <Input
          {...attrs}
          bind:value={$formData.password}
          type="password"
          disabled={$delayed}
          placeholder={m.enter_your_password()}
        />
      </Form.Control>
      <Form.FieldErrors />
    </Form.Field>

    <!-- Submit -->
    <Form.Button class="self-start mt-1" size="sm" disabled={$delayed}>
      {#if $delayed}
        <Spinner />
      {:else}
        {m.login()}
      {/if}
    </Form.Button>
  </form>
  <a href="/auth/reset" class="mx-auto text-sm underline text-foreground"
    >{m.forgot_password()}</a
  >
</div>
