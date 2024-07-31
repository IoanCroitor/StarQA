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
    passwordConfirmSchema,
    type PasswordConfirmSchema,
  } from '$lib/config/zod-schema'
  import Spinner from '@/assets/Spinner.svelte'
  import { Progress } from '@/components/ui/progress'
  import * as m from '$lib/paraglide/messages'
  import { handleToast } from '@/handleToast'
  import {
    calculateStrength,
    progressColorFunction,
  } from '$lib/passwordComplexity'

  export let data: SuperValidated<Infer<PasswordConfirmSchema>>

  const form = superForm(data, {
    validators: zodClient(passwordConfirmSchema),
  })

  const { form: formData, enhance, delayed, message } = form

  message.subscribe((value) => {
    if (value) {
      handleToast('error', value.status, value.message)
    }
  })

  // password strength progress bar
  $: arePasswordsMatching = $formData.password === $formData.confirmPassword
  $: strength = calculateStrength($formData.password)
  $: progressColor = progressColorFunction(
    arePasswordsMatching,
    $formData.confirmPassword,
    strength,
  )
</script>

<div class="grid gap-2">
  <form
    method="POST"
    use:enhance
    action="?/formSubmit"
    class="w-full grid gap-1"
  >
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

      <!-- Confirm Password -->
    </Form.Field>
    <Form.Field {form} name="confirmPassword">
      <Form.Control let:attrs>
        <Form.Label class="font-semibold">{m.confirm_password()}</Form.Label>
        <Input
          {...attrs}
          bind:value={$formData.confirmPassword}
          type="password"
          disabled={$delayed}
          placeholder={m.enter_your_password()}
        />
      </Form.Control>
    </Form.Field>

    <div class="w-full px-1 my-1">
      <Progress value={strength} max={100} class={` ${progressColor}`} />
    </div>

    <!-- Submit Button -->
    <Form.Button
      class="self-start mt-1"
      size="sm"
      disabled={!arePasswordsMatching}
    >
      {#if $delayed}
        <Spinner />
      {:else}
        {m.change_password()}
      {/if}
    </Form.Button>
  </form>
</div>
