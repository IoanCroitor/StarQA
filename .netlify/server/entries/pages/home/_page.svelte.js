import { c as create_ssr_component, v as validate_component, b as add_attribute, e as escape, a as each } from "../../../chunks/ssr.js";
import { f as fetchLeaderboardData, A as Avatar, d as Avatar_image } from "../../../chunks/querryUtils.js";
import "dequal";
import "../../../chunks/index3.js";
import "clsx";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../chunks/card-title.js";
import { I as Icon } from "../../../chunks/Icon.js";
import { g as getTranslationFunctions } from "../../../chunks/index5.js";
import { C as Card_description } from "../../../chunks/card-description.js";
import "../../../chunks/client.js";
import { I as Input } from "../../../chunks/input.js";
import { l as languageTag } from "../../../chunks/runtime.js";
import { B as Button } from "../../../chunks/button.js";
import { h as handleToast } from "../../../chunks/handleToast.js";
import { T as Table, a as Table_header, b as Table_row, c as Table_head, d as Table_body, e as Table_cell } from "../../../chunks/table-row.js";
import "../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import "../../../chunks/supabaseClient.js";
import { b as PUBLIC_BUCKET_PATH } from "../../../chunks/public.js";
import { f as formatDate } from "../../../chunks/utils.js";
import { C as Card_footer } from "../../../chunks/card-footer.js";
import "../../../chunks/index2.js";
import { tv } from "tailwind-variants";
const join_a_quiz_to_rank_higher_in_the_leaderboards$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Join a quiz to test your knowledge and rank higher in the leaderboards`;
const join_a_quiz$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Join a quiz!`;
const join$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Join`;
const create$1 = /* @__NO_SIDE_EFFECTS__ */ () => `Create`;
const or$1 = /* @__NO_SIDE_EFFECTS__ */ () => `or`;
const join_a_quiz_to_rank_higher_in_the_leaderboards = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: join_a_quiz_to_rank_higher_in_the_leaderboards$1,
    fr: join_a_quiz_to_rank_higher_in_the_leaderboards$1,
    ro: join_a_quiz_to_rank_higher_in_the_leaderboards$1
  }[options.languageTag ?? languageTag()]();
};
const join_a_quiz = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: join_a_quiz$1,
    fr: join_a_quiz$1,
    ro: join_a_quiz$1
  }[options.languageTag ?? languageTag()]();
};
const join = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: join$1,
    fr: join$1,
    ro: join$1
  }[options.languageTag ?? languageTag()]();
};
const create = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: create$1,
    fr: create$1,
    ro: create$1
  }[options.languageTag ?? languageTag()]();
};
const or = /* @__NO_SIDE_EFFECTS__ */ (params = {}, options = {}) => {
  return {
    en: or$1,
    fr: or$1,
    ro: or$1
  }[options.languageTag ?? languageTag()]();
};
const FeaturedContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  return ` ${validate_component(Card, "Card.Root").$$render($$result, { class: "" }, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render(
        $$result,
        {
          class: "flex flex-col items-start gap-4 py-6 min-h-max"
        },
        {},
        {
          default: () => {
            return `<div class="space-y-4"><div class="w-full h-24 rounded-lg overflow-hidden mx-auto" data-svelte-h="svelte-19b5c8y"><img class="object-cover w-full h-full" alt="Space Race" src="https://cdn.mos.cms.futurecdn.net/iBN6fuoeYTJmqb7y4fjzDn-1200-80.jpg.webp"></div> <div class="px-1"><a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`https://printrestele.netlify.app/`, void 0), 0)} target="_blank" class="space-y-1">${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
              default: () => {
                return `Razboiul Rece Printre Stele`;
              }
            })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
              default: () => {
                return `Un site interactiv si educativ in care explorezi subiectul &quot;The
            Space Race&quot;`;
              }
            })}</a></div></div>`;
          }
        }
      )}`;
    }
  })}`;
});
const JoinQuiz = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let redirect;
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Card, "Card.Root").$$render(
      $$result,
      {
        class: "w-full h-full flex flex-col justify-center"
      },
      {},
      {
        default: () => {
          return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(/* @__PURE__ */ join_a_quiz())}`;
                }
              })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
                default: () => {
                  return `${escape(/* @__PURE__ */ join_a_quiz_to_rank_higher_in_the_leaderboards())}`;
                }
              })}`;
            }
          })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
            default: () => {
              return `<div class="flex flex-row gap-2">${validate_component(Input, "Input").$$render(
                $$result,
                {
                  type: "number",
                  class: "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
                  value: redirect
                },
                {
                  value: ($$value) => {
                    redirect = $$value;
                    $$settled = false;
                  }
                },
                {}
              )} ${validate_component(Button, "Button").$$render($$result, { class: "w-20" }, {}, {
                default: () => {
                  return `${escape(/* @__PURE__ */ join())}`;
                }
              })}</div> <p class="flex justify-center text-muted-foreground text-xs my-1">${escape(/* @__PURE__ */ or())}</p> <a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(`/home/create`, void 0), 0)} target="_blank">${validate_component(Button, "Button").$$render($$result, { variant: "secondary", class: "w-full" }, {}, {
                default: () => {
                  return `${escape(/* @__PURE__ */ create())}`;
                }
              })}</a>`;
            }
          })}`;
        }
      }
    )}`;
  } while (!$$settled);
  return $$rendered;
});
tv({
  base: "fixed z-50 gap-4 bg-background p-6 shadow-lg",
  variants: {
    side: {
      top: "inset-x-0 top-0 border-b ",
      bottom: "inset-x-0 bottom-0 border-t",
      left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
      right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm"
    }
  },
  defaultVariants: {
    side: "right"
  }
});
const css = {
  code: ".truncate-multiline.svelte-ndq68m{display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}",
  map: `{"version":3,"file":"QuizCard.svelte","sources":["QuizCard.svelte"],"sourcesContent":["<script lang=\\"ts\\">\\nimport { getTranslationFunctions as paraglide_sveltekit_translate_attribute_pass_getTranslationFunctions } from '@inlang/paraglide-sveltekit/internal';\\nimport { PUBLIC_BUCKET_PATH } from \\"$env/static/public\\";\\nimport * as Card from \\"$lib/components/ui/card/index.js\\";\\nimport Badge from \\"@/components/ui/badge/badge.svelte\\";\\nimport { Footer } from \\"@/components/ui/sheet\\";\\nimport { formatDate } from \\"@/utils\\";\\nexport let title = \\"\\";\\nexport let description = \\"\\";\\nexport let link = \\"\\";\\nexport let tags;\\nexport let date = \\"\\";\\nexport let image = \\"\\";\\n$: date = formatDate(date);\\n$: image = PUBLIC_BUCKET_PATH + image;\\n\\nconst paraglide_sveltekit_translate_attribute_pass_translationFunctions = paraglide_sveltekit_translate_attribute_pass_getTranslationFunctions();\\nconst [ paraglide_sveltekit_translate_attribute_pass_translateAttribute, paraglide_sveltekit_translate_attribute_pass_handle_attributes ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;\\n<\/script>\\n\\n<a href={paraglide_sveltekit_translate_attribute_pass_translateAttribute(\\n                                            link,\\n                                            undefined\\n                                        )} target=\\"_blank\\" class=\\"w-full h-full\\">\\n  <Card.Root>\\n    <Card.Header>\\n      <div class=\\"h-36 w-full rounded-lg overflow-hidden\\">\\n        <img class=\\"object-cover w-full h-full\\" alt={title} src={image} />\\n      </div>\\n    </Card.Header>\\n    <Card.Content class=\\"flex flex-col\\">\\n      <p class=\\"text-primary truncate\\">{title}</p>\\n      <p class=\\"text-muted-foreground truncate-multiline\\">{description}</p>\\n    </Card.Content>\\n    <Card.Footer>\\n      <p class=\\"text-primary/70 bg-muted/30 rounded-lg w-fit h-fit py-1 px-2\\">\\n        {date}\\n      </p>\\n    </Card.Footer>\\n  </Card.Root>\\n</a>\\n\\n<style>\\n  .truncate-multiline {\\n    display: -webkit-box;\\n    -webkit-line-clamp: 3;\\n    -webkit-box-orient: vertical;\\n    overflow: hidden;\\n    text-overflow: ellipsis;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA2CE,iCAAoB,CAClB,OAAO,CAAE,WAAW,CACpB,kBAAkB,CAAE,CAAC,CACrB,kBAAkB,CAAE,QAAQ,CAC5B,QAAQ,CAAE,MAAM,CAChB,aAAa,CAAE,QACjB"}`
};
const QuizCard = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "" } = $$props;
  let { description = "" } = $$props;
  let { link = "" } = $$props;
  let { tags } = $$props;
  let { date = "" } = $$props;
  let { image = "" } = $$props;
  const paraglide_sveltekit_translate_attribute_pass_translationFunctions = getTranslationFunctions();
  const [
    paraglide_sveltekit_translate_attribute_pass_translateAttribute,
    paraglide_sveltekit_translate_attribute_pass_handle_attributes
  ] = paraglide_sveltekit_translate_attribute_pass_translationFunctions;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.link === void 0 && $$bindings.link && link !== void 0) $$bindings.link(link);
  if ($$props.tags === void 0 && $$bindings.tags && tags !== void 0) $$bindings.tags(tags);
  if ($$props.date === void 0 && $$bindings.date && date !== void 0) $$bindings.date(date);
  if ($$props.image === void 0 && $$bindings.image && image !== void 0) $$bindings.image(image);
  $$result.css.add(css);
  date = formatDate(date);
  image = PUBLIC_BUCKET_PATH + image;
  return `<a${add_attribute("href", paraglide_sveltekit_translate_attribute_pass_translateAttribute(link, void 0), 0)} target="_blank" class="w-full h-full">${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="h-36 w-full rounded-lg overflow-hidden"><img class="object-cover w-full h-full"${add_attribute("alt", title, 0)}${add_attribute("src", image, 0)}></div>`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, { class: "flex flex-col" }, {}, {
        default: () => {
          return `<p class="text-primary truncate">${escape(title)}</p> <p class="text-muted-foreground truncate-multiline svelte-ndq68m">${escape(description)}</p>`;
        }
      })} ${validate_component(Card_footer, "Card.Footer").$$render($$result, {}, {}, {
        default: () => {
          return `<p class="text-primary/70 bg-muted/30 rounded-lg w-fit h-fit py-1 px-2">${escape(date)}</p>`;
        }
      })}`;
    }
  })} </a>`;
});
const QuizGrid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let quizzes = [];
  return `<div class="p-4 rounded-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">${each(quizzes, (quiz) => {
    return `${validate_component(QuizCard, "QuizCard").$$render(
      $$result,
      {
        date: quiz.created_at,
        description: quiz.description,
        title: quiz.quiz_name,
        image: quiz.thumbnail_url_path,
        link: `/home/${quiz.join_code}`,
        tags: quiz.tags
      },
      {},
      {}
    )}`;
  })}</div> <div class="text-center mt-2 mb-6">${`<button class="px-6 py-2 bg-primary-foreground text-primary rounded-lg hover:bg-primary-foreground/90 focus:outline-none focus:ring-2 focus:ring-muted-foreground/70 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed" ${""}>${`<span data-svelte-h="svelte-1er2qmt">Load More</span>`}</button>`} ${``}</div>`;
});
function findUserRank(leaderboard2, username2) {
  for (let i = 0; i < leaderboard2.length; i++) {
    if (leaderboard2[i].user_data.username === username2) {
      return leaderboard2[i].rank;
    }
  }
  return null;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let profile_picture = "";
  let username = "";
  let user_score = null;
  let rank = null;
  const { supabase, user } = data;
  let userId = String(user?.id);
  let name = user?.user_metadata?.full_name || "Unknown User";
  let leaderboard = [];
  async function fetchUserData() {
    const { data: data2, error } = await supabase.from("user_data").select("username, profile_picture, user_score").eq("user_id", userId).single();
    if (error) {
      handleToast("error", 400, "Error fetching user data");
      return { data: null, error };
    }
    return { data: data2, error: null };
  }
  let userDataProfile;
  fetchUserData().then((result) => {
    if (result.data) {
      userDataProfile = result.data;
      username = userDataProfile.username;
      profile_picture = "https://vclfhqfyjiplikdyazvq.supabase.co/storage/v1/object/public/profile_pictures/" + userDataProfile.profile_picture;
      user_score = userDataProfile.user_score;
    }
  });
  fetchLeaderboardData(supabase).then((result) => {
    if (result.data) {
      leaderboard = result.data;
    }
  });
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  rank = findUserRank(leaderboard, username);
  return `<div class="mt-3"></div> <div class="grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-1 grid-rows-2 grid-flow-col gap-2 my-3 overflow-hidden sm:max-h-72">${validate_component(Card, "Card.Root").$$render($$result, { class: "sm:col-span-2" }, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, { class: "pb-4" }, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `Account Stats`;
            }
          })}`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="flex items-center gap-4">${validate_component(Avatar, "Avatar.Root").$$render($$result, { class: "hidden h-9 w-9 sm:flex" }, {}, {
            default: () => {
              return `${validate_component(Avatar_image, "Avatar.Image").$$render($$result, { src: profile_picture, alt: "Avatar" }, {}, {})}`;
            }
          })} <div class="grid gap-1"><p class="text-sm font-medium leading-none">${escape(name)}</p> <p class="text-muted-foreground text-sm">@${escape(username)}</p></div> <div class="flex flex-row gap-2 ml-auto"><div class="font-medium bg-purple-500/20 items-center text-purple-500/80 px-2 rounded"><p>${escape(user_score ? `${user_score} points` : "Loading points...")}</p></div></div> ${rank ? `<div class="font-medium bg-green-500/20 flex flex-row items-center text-green-500 px-2 rounded">${validate_component(Icon, "Icon").$$render(
            $$result,
            {
              icon: rank === 1 ? "mdi:medal" : rank === 2 ? "mdi:star" : "mdi:rank",
              width: "1.25rem",
              height: "1.25rem"
            },
            {},
            {}
          )} <p>Ranked #${escape(rank)}</p></div>` : ``}</div> <div class="pt-3 font-semibold overflow-hidden group-hover:overflow-auto group-focus:overflow-auto">${validate_component(Table, "Table.Root").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Table_header, "Table.Header").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Table_head, "Table.Head").$$render($$result, { class: "w-[100px]" }, {}, {
                        default: () => {
                          return `Rank`;
                        }
                      })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                        default: () => {
                          return `Username`;
                        }
                      })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "text-right" }, {}, {
                        default: () => {
                          return `Score`;
                        }
                      })}`;
                    }
                  })}`;
                }
              })} ${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
                default: () => {
                  return `${each(leaderboard, (entry, i) => {
                    return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "font-medium" }, {}, {
                          default: () => {
                            return `${escape(entry.rank)}`;
                          }
                        })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${escape(entry.user_data.username)}`;
                          }
                        })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "text-right" }, {}, {
                          default: () => {
                            return `${escape(entry.score)}`;
                          }
                        })} `;
                      }
                    })}`;
                  })}`;
                }
              })}`;
            }
          })}</div>`;
        }
      })}`;
    }
  })} ${validate_component(JoinQuiz, "JoinQuiz").$$render($$result, {}, {}, {})}</div> <div class="flex flex-col border border-none bg-muted-foreground/10 rounded-lg p-4"><div class="flex flex-row items-center bg-purple-700 w-fit rounded-lg mb-3 px-2 py-1">${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "mdi:star",
      width: "1rem",
      height: "1rem"
    },
    {},
    {}
  )} <h2 class="font-semibold text-sm" data-svelte-h="svelte-16kpxgd">Featured Content</h2></div> <div class="flex flex-row overflow-hidden rounded-lg"><div class="w-72">${validate_component(FeaturedContent, "FeaturedContent").$$render($$result, {}, {}, {})}</div></div></div> ${validate_component(QuizGrid, "QuizGrid").$$render($$result, {}, {}, {})}`;
});
export {
  Page as default
};
