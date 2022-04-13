module.exports = {
  types: [
    { value: ':sparkles', name: '✨ feat:\tAdding a new feature' },
    { value: ':bug', name: '🐛 fix:\tFixing a bug' },
    { value: ':memo', name: '📝 docs:\tAdd or update documentation' },
    {
      value: ':lipstick',
      name: '💄 style:\tAdd or update styles, ui or ux',
    },
    {
      value: ':recycle',
      name: '♻️ refactor:\tCode change that neither fixes a bug nor adds a feature',
    },
    {
      value: ':pencil2',
      name: '✏️ typo:\tFix typo',
    },
    {
      value: ':zap',
      name: '⚡️ perf:\tCode change that improves performance',
    },
    {
      value: ':white_check_mark',
      name: '✅ test:\tAdding tests cases',
    },
    {
      value: ':truck',
      name: '🚚 chore:\tChanges to the build process or auxiliary tools\n\t\tand libraries such as documentation generation',
    },
    { value: ':rewind', name: '⏪️ revert:\tRevert to a commit' },
    { value: ':construction', name: '🚧 wip:\tWork in progress' },
    {
      value: ':construction_worker',
      name: '👷 build:\tAdd or update regards to build process',
    },
    {
      value: ':green_heart',
      name: '💚 ci:\tAdd or update regards to build process',
    },
  ],
  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  subjectLimit: 100,
};
