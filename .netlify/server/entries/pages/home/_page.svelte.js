import {
  c as create_ssr_component,
  v as validate_component,
  d as add_attribute,
  e as escape,
} from '../../../chunks/ssr.js'
import { I as Icon } from '../../../chunks/Icon.js'
import { g as getTranslationFunctions } from '../../../chunks/index4.js'
import {
  C as Card,
  a as Card_header,
  b as Card_title,
  c as Card_content,
} from '../../../chunks/card-title.js'
import 'clsx'
import { C as Card_description } from '../../../chunks/card-description.js'
import '../../../chunks/client.js'
import '../../../chunks/index2.js'
import { I as Input } from '../../../chunks/input.js'
import {
  j as join_a_quiz,
  a as join_a_quiz_to_rank_higher_in_the_leaderboards,
  b as join,
  o as or,
  c as create,
} from '../../../chunks/index9.js'
import { B as Button } from '../../../chunks/button.js'
import {
  A as Avatar,
  a as Avatar_image,
  b as Avatar_fallback,
} from '../../../chunks/avatar-fallback.js'
const FeaturedContent = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    const paraglide_sveltekit_translate_attribute_pass_translationFunctions =
      getTranslationFunctions()
    const [
      paraglide_sveltekit_translate_attribute_pass_translateAttribute,
      paraglide_sveltekit_translate_attribute_pass_handle_attributes,
    ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions
    return `${validate_component(Card, 'Card.Root').$$render(
      $$result,
      { class: '' },
      {},
      {
        default: () => {
          return `${validate_component(Card_header, 'Card.Header').$$render(
            $$result,
            {
              class: 'flex flex-col items-start gap-4 py-6 min-h-max',
            },
            {},
            {
              default: () => {
                return `<div class="space-y-4"><div class="w-full h-24 rounded-lg overflow-hidden mx-auto" data-svelte-h="svelte-1hrbagy"><img class="object-cover w-full h-full" alt="Space Race" src="https://cdn.mos.cms.futurecdn.net/iBN6fuoeYTJmqb7y4fjzDn-1200-80.jpg.webp"></div> <div class="px-1"><a${add_attribute('href', paraglide_sveltekit_translate_attribute_pass_translateAttribute(`https://printrestele.netlify.app/`, void 0), 0)} target="_blank" class="space-y-1">${validate_component(
                  Card_title,
                  'Card.Title',
                ).$$render(
                  $$result,
                  {},
                  {},
                  {
                    default: () => {
                      return `Razboiul Rece Printre Stele`
                    },
                  },
                )} ${validate_component(
                  Card_description,
                  'Card.Description',
                ).$$render(
                  $$result,
                  {},
                  {},
                  {
                    default: () => {
                      return `Un site interactiv si educativ in care explorezi subiectul &quot;The
              Space Race&quot;`
                    },
                  },
                )}</a></div></div>`
              },
            },
          )}`
        },
      },
    )}`
  },
)
const JoinQuiz = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    let redirect
    const paraglide_sveltekit_translate_attribute_pass_translationFunctions =
      getTranslationFunctions()
    const [
      paraglide_sveltekit_translate_attribute_pass_translateAttribute,
      paraglide_sveltekit_translate_attribute_pass_handle_attributes,
    ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions
    let $$settled
    let $$rendered
    let previous_head = $$result.head
    do {
      $$settled = true
      $$result.head = previous_head
      $$rendered = `${validate_component(Card, 'Card.Root').$$render(
        $$result,
        {},
        {},
        {
          default: () => {
            return `${validate_component(Card_header, 'Card.Header').$$render(
              $$result,
              {},
              {},
              {
                default: () => {
                  return `${validate_component(
                    Card_title,
                    'Card.Title',
                  ).$$render(
                    $$result,
                    {},
                    {},
                    {
                      default: () => {
                        return `${escape(join_a_quiz())}`
                      },
                    },
                  )} ${validate_component(
                    Card_description,
                    'Card.Description',
                  ).$$render(
                    $$result,
                    {},
                    {},
                    {
                      default: () => {
                        return `${escape(join_a_quiz_to_rank_higher_in_the_leaderboards())}`
                      },
                    },
                  )}`
                },
              },
            )} ${validate_component(Card_content, 'Card.Content').$$render(
              $$result,
              {},
              {},
              {
                default: () => {
                  return `<div class="flex flex-row gap-2">${validate_component(
                    Input,
                    'Input',
                  ).$$render(
                    $$result,
                    {
                      type: 'number',
                      class:
                        '[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none',
                      value: redirect,
                    },
                    {
                      value: ($$value) => {
                        redirect = $$value
                        $$settled = false
                      },
                    },
                    {},
                  )} ${validate_component(Button, 'Button').$$render(
                    $$result,
                    { class: 'w-20' },
                    {},
                    {
                      default: () => {
                        return `${escape(join())}`
                      },
                    },
                  )}</div> <p class="flex justify-center text-muted-foreground text-xs my-1">${escape(or())}</p> <a${add_attribute('href', paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/home/create`, void 0), 0)} target="_blank">${validate_component(
                    Button,
                    'Button',
                  ).$$render(
                    $$result,
                    { variant: 'secondary', class: 'w-full' },
                    {},
                    {
                      default: () => {
                        return `${escape(create())}`
                      },
                    },
                  )}</a>`
                },
              },
            )}`
          },
        },
      )}`
    } while (!$$settled)
    return $$rendered
  },
)
const UserStats = create_ssr_component(
  ($$result, $$props, $$bindings, slots) => {
    return `${validate_component(Card, 'Card.Root').$$render(
      $$result,
      { class: 'sm:col-span-2' },
      {},
      {
        default: () => {
          return `${validate_component(Card_header, 'Card.Header').$$render(
            $$result,
            { class: 'pb-4' },
            {},
            {
              default: () => {
                return `${validate_component(Card_title, 'Card.Title').$$render(
                  $$result,
                  {},
                  {},
                  {
                    default: () => {
                      return `Account Stas`
                    },
                  },
                )}`
              },
            },
          )} ${validate_component(Card_content, 'Card.Content').$$render(
            $$result,
            {},
            {},
            {
              default: () => {
                return `<div class="flex items-center gap-4">${validate_component(
                  Avatar,
                  'Avatar.Root',
                ).$$render(
                  $$result,
                  { class: 'hidden h-9 w-9 sm:flex' },
                  {},
                  {
                    default: () => {
                      return `${validate_component(Avatar_image, 'Avatar.Image').$$render($$result, { src: '', alt: 'Avatar' }, {}, {})} ${validate_component(
                        Avatar_fallback,
                        'Avatar.Fallback',
                      ).$$render(
                        $$result,
                        {},
                        {},
                        {
                          default: () => {
                            return `OM`
                          },
                        },
                      )}`
                    },
                  },
                )} <div class="grid gap-1" data-svelte-h="svelte-6c5ixf"><p class="text-sm font-medium leading-none">Ioan Croitor</p> <p class="text-muted-foreground text-sm">@ioancroitor</p></div> <div class="flex flex-row gap-2 ml-auto" data-svelte-h="svelte-17zz4og"><div class="font-medium bg-purple-500/20 items-center text-purple-500/80 px-2 rounded"><p>500 points</p></div></div> <div class="font-medium bg-green-500/20 flex flex-row items-center text-green-500 px-2 rounded">${validate_component(
                  Icon,
                  'Icon',
                ).$$render(
                  $$result,
                  {
                    icon: 'mdi:chevron-up',
                    width: '1.25rem',
                    height: '1.25rem',
                  },
                  {},
                  {},
                )} <p data-svelte-h="svelte-k6zdyx">1st place</p></div></div> <div class="pt-3 font-semibold" data-svelte-h="svelte-1tisudg"><p>Leaderboard</p></div>`
              },
            },
          )}`
        },
      },
    )}`
  },
)
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<div class="mt-3" data-svelte-h="svelte-n1wf4m"></div> <div class="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 grid-rows-2 grid-flow-col gap-2 my-3">${validate_component(UserStats, 'UserStats').$$render($$result, {}, {}, {})} ${validate_component(JoinQuiz, 'JoinQuiz').$$render($$result, {}, {}, {})}</div> <div class="flex flex-col border border-none bg-muted-foreground/10 rounded-lg p-4"><div class="flex flex-row items-center bg-purple-700 w-fit rounded-lg mb-3 px-2 py-1">${validate_component(
    Icon,
    'Icon',
  ).$$render(
    $$result,
    {
      icon: 'mdi:star',
      width: '1rem',
      height: '1rem',
    },
    {},
    {},
  )} <h2 class="font-semibold text-sm " data-svelte-h="svelte-zxo9wr">Featured Content</h2></div> <div class="flex flex-row overflow-hidden rounded-lg"><div class="w-72">${validate_component(FeaturedContent, 'FeaturedContent').$$render($$result, {}, {}, {})}</div></div></div>`
})
export { Page as default }
