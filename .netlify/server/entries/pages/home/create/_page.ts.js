const load = async ({ parent }) => {
  const data = await parent();
  return {
    session: data.session,
    supabase: data.supabase,
    user: data.user
  };
};
export {
  load
};
