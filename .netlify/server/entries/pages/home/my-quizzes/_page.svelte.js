import { c as create_ssr_component, s as spread, b as escape_attribute_value, d as escape_object, v as validate_component, f as each, e as escape, a as add_attribute } from "../../../../chunks/ssr.js";
import { b as PUBLIC_BUCKET_PATH } from "../../../../chunks/public.js";
import "../../../../chunks/index4.js";
import "../../../../chunks/index3.js";
import { C as Card, a as Card_header, b as Card_title, c as Card_content } from "../../../../chunks/card-title.js";
import { C as Card_description } from "../../../../chunks/card-description.js";
import { C as Card_footer } from "../../../../chunks/card-footer.js";
import { R as Root, T as Trigger, D as Dropdown_menu_content, a as Dropdown_menu_label, b as Dropdown_menu_item } from "../../../../chunks/index6.js";
import { c as compute_rest_props } from "../../../../chunks/lifecycle.js";
import { c as cn } from "../../../../chunks/utils.js";
import "clsx";
import "../../../../chunks/Toaster.svelte_svelte_type_style_lang.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { B as Button } from "../../../../chunks/button.js";
const Table = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<div class="relative w-full overflow-auto"><table${spread(
    [
      {
        class: escape_attribute_value(cn("w-full caption-bottom text-sm", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</table></div>`;
});
const Table_body = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<tbody${spread(
    [
      {
        class: escape_attribute_value(cn("[&_tr:last-child]:border-0", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</tbody>`;
});
const Table_cell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<td${spread(
    [
      {
        class: escape_attribute_value(cn("p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</td>`;
});
const Table_head = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<th${spread(
    [
      {
        class: escape_attribute_value(cn("text-muted-foreground h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</th>`;
});
const Table_header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return ` <thead${spread(
    [
      {
        class: escape_attribute_value(cn("[&_tr]:border-b", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</thead>`;
});
const Table_row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["class"]);
  let { class: className = void 0 } = $$props;
  if ($$props.class === void 0 && $$bindings.class && className !== void 0) $$bindings.class(className);
  return `<tr${spread(
    [
      {
        class: escape_attribute_value(cn("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</tr>`;
});
function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true
  };
  return new Date(dateString).toLocaleString("en-US", options);
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  const { supabase, user } = data;
  let quizzes = [];
  async function getMyQuizzes() {
    const userid = user.id;
    const { data: fetchedQuizzes, error } = await supabase.from("quizzes").select("*").eq("created_by", userid);
    if (error) {
      console.log("Error getting my quizzes", error);
    } else {
      quizzes = fetchedQuizzes;
    }
  }
  getMyQuizzes();
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  return `<div class="m-3"></div> ${validate_component(Card, "Card.Root").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Card_header, "Card.Header").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Card_title, "Card.Title").$$render($$result, {}, {}, {
            default: () => {
              return `My Quizzes`;
            }
          })} ${validate_component(Card_description, "Card.Description").$$render($$result, {}, {}, {
            default: () => {
              return `View details about your quizzes`;
            }
          })}`;
        }
      })} ${validate_component(Card_content, "Card.Content").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Table, "Table.Root").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Table_header, "Table.Header").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(Table_head, "Table.Head").$$render($$result, { class: "hidden w-[100px] sm:table-cell" }, {}, {
                        default: () => {
                          return `<span class="sr-only" data-svelte-h="svelte-byf1fw">Image</span>`;
                        }
                      })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                        default: () => {
                          return `Name`;
                        }
                      })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                        default: () => {
                          return `Join Code`;
                        }
                      })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                        default: () => {
                          return `Description`;
                        }
                      })} ${validate_component(Table_head, "Table.Head").$$render($$result, { class: "hidden md:table-cell" }, {}, {
                        default: () => {
                          return `Created at`;
                        }
                      })} ${validate_component(Table_head, "Table.Head").$$render($$result, {}, {}, {
                        default: () => {
                          return `<span class="sr-only" data-svelte-h="svelte-1nvuc3u">Actions</span>`;
                        }
                      })}`;
                    }
                  })}`;
                }
              })} ${validate_component(Table_body, "Table.Body").$$render($$result, {}, {}, {
                default: () => {
                  return `${each(quizzes, ({ id, thumbnail_url_path, quiz_name, join_code, description, created_at }) => {
                    return `${validate_component(Table_row, "Table.Row").$$render($$result, {}, {}, {
                      default: () => {
                        return `${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "hidden sm:table-cell" }, {}, {
                          default: () => {
                            return `<img alt="Quiz Thumbnail" class="aspect-square rounded-md object-cover" height="64"${add_attribute(
                              "src",
                              thumbnail_url_path ? `${PUBLIC_BUCKET_PATH}${thumbnail_url_path}` : "https://upload.wikimedia.org/wikipedia/commons/3/3f/Placeholder_view_vector.svg",
                              0
                            )} width="64"> `;
                          }
                        })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "font-medium" }, {}, {
                          default: () => {
                            return `${escape(quiz_name)}`;
                          }
                        })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${escape(join_code)}`;
                          }
                        })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${escape(description)}`;
                          }
                        })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, { class: "hidden md:table-cell" }, {}, {
                          default: () => {
                            return `${escape(formatDate(created_at))} `;
                          }
                        })} ${validate_component(Table_cell, "Table.Cell").$$render($$result, {}, {}, {
                          default: () => {
                            return `${validate_component(Root, "DropdownMenu.Root").$$render($$result, {}, {}, {
                              default: () => {
                                return `${validate_component(Trigger, "DropdownMenu.Trigger").$$render($$result, { asChild: true }, {}, {
                                  default: ({ builder }) => {
                                    return `${validate_component(Button, "Button").$$render(
                                      $$result,
                                      {
                                        "aria-haspopup": "true",
                                        size: "icon",
                                        variant: "outline",
                                        builders: [builder]
                                      },
                                      {},
                                      {
                                        default: () => {
                                          return `${validate_component(Icon, "Icon").$$render(
                                            $$result,
                                            {
                                              icon: "mdi:dots-vertical",
                                              width: "1.2rem",
                                              height: "1.2rem"
                                            },
                                            {},
                                            {}
                                          )} <span class="sr-only" data-svelte-h="svelte-zt9sly">Toggle menu</span> `;
                                        }
                                      }
                                    )} `;
                                  }
                                })} ${validate_component(Dropdown_menu_content, "DropdownMenu.Content").$$render($$result, { align: "end" }, {}, {
                                  default: () => {
                                    return `${validate_component(Dropdown_menu_label, "DropdownMenu.Label").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `Actions`;
                                      }
                                    })} ${validate_component(Dropdown_menu_item, "DropdownMenu.Item").$$render($$result, {}, {}, {
                                      default: () => {
                                        return `Delete`;
                                      }
                                    })} `;
                                  }
                                })} `;
                              }
                            })} `;
                          }
                        })} `;
                      }
                    })}`;
                  })}`;
                }
              })}`;
            }
          })}`;
        }
      })} ${validate_component(Card_footer, "Card.Footer").$$render($$result, {}, {}, {
        default: () => {
          return `<div class="text-muted-foreground text-xs">Showing <strong>1-${escape(quizzes.length)}</strong> of
      <strong>${escape(quizzes.length)}</strong> quizzes</div>`;
        }
      })}`;
    }
  })}`;
});
export {
  Page as default
};
