const BASELINES = [
  "Quand la magie opr’",
  "Une potion de suc’ pour briller",
  "Ton CV devient lumire",
  "Coucou? CV?",
  "Accio CV",
  "Travail, famille, CV",
  "Un CV pour les embaucher tous 💍",
];

export const getDynamicBaseline = () => {
  const maxLength = BASELINES.length;
  const randomIndex = Math.floor(Math.random() * maxLength);

  return BASELINES[randomIndex];
};
