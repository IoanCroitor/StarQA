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

  import {
    calculateStrength,
    progressColorFunction,
  } from '$lib/passwordComplexity'
  function handleErrorToast(status: number, error: string) {
    toast.error(error, {
      description: 'Error Code: ' + status,
      action: {
        label: 'Close',
        onClick: () =>
          console.info(
            'Closed error message: ' + error + ' with the status: ' + status,
          ),
      },
    })
  }

  export let data: SuperValidated<Infer<PasswordConfirmSchema>>

  const form = superForm(data, {
    validators: zodClient(passwordConfirmSchema),
  })

  const { form: formData, enhance, delayed, message } = form

  message.subscribe((value) => {
    if (value) {
      handleErrorToast(value.status, value.message)
    }
  })

  // password strength progress bar

  $: arePasswordsMathing = $formData.password === $formData.confirmPassword
  $: strength = calculateStrength($formData.password)
  $: progressColor = progressColorFunction(
    arePasswordsMathing,
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
        <Form.Label class="font-semibold">Password</Form.Label>
        <Input
          {...attrs}
          bind:value={$formData.password}
          type="password"
          disabled={$delayed}
          placeholder="Enter your password"
        />
      </Form.Control>
      <Form.FieldErrors />

      <!-- Confirm Password -->
    </Form.Field>
    <Form.Field {form} name="password">
      <Form.Control let:attrs>
        <Form.Label class="font-semibold">Confirm password</Form.Label>
        <Input
          {...attrs}
          bind:value={$formData.confirmPassword}
          type="password"
          disabled={$delayed}
          placeholder="Enter your password"
        />
      </Form.Control>
    </Form.Field>

    <div class="w-full px-1 my-1">
      <Progress value={strength} max={100} class={` ${progressColor} `} />
    </div>

    <!-- Submit Button -->
    <Form.Button
      class="self-start mt-1"
      size="sm"
      disabled={!arePasswordsMathing}
    >
      {#if $delayed}
        <Spinner />
      {:else}
        Change Password
      {/if}
    </Form.Button>
  </form>
</div>
