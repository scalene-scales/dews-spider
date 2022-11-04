export type StandardPlayingCardSuit = "♠" | "♥" | "♦" | "♣";
export type StandardPlayingCardRank =
  | "A"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "J"
  | "Q"
  | "K";

export type StandardPlayingCard = {
  suit: StandardPlayingCardSuit;
  rank: StandardPlayingCardRank;
};

export function getUnicodeCard(card: StandardPlayingCard): string {
  switch (card.rank) {
    case "A":
      switch (card.suit) {
        case "♠":
          return "🂡";
        case "♥":
          return "🂱";
        case "♦":
          return "🃁";
        case "♣":
          return "🃑";
        default:
          const _exhaustiveCheck: never = card.suit;
          return _exhaustiveCheck;
      }
    case "2":
      switch (card.suit) {
        case "♠":
          return "🂢";
        case "♥":
          return "🂲";
        case "♦":
          return "🃂";
        case "♣":
          return "🃒";
        default:
          const _exhaustiveCheck: never = card.suit;
          return _exhaustiveCheck;
      }
    case "3":
      switch (card.suit) {
        case "♠":
          return "🂣";
        case "♥":
          return "🂳";
        case "♦":
          return "🃃";
        case "♣":
          return "🃓";
        default:
          const _exhaustiveCheck: never = card.suit;
          return _exhaustiveCheck;
      }
    case "4":
      switch (card.suit) {
        case "♠":
          return "🂤";
        case "♥":
          return "🂴";
        case "♦":
          return "🃄";
        case "♣":
          return "🃔";
        default:
          const _exhaustiveCheck: never = card.suit;
          return _exhaustiveCheck;
      }
    case "5":
      switch (card.suit) {
        case "♠":
          return "🂥";
        case "♥":
          return "🂵";
        case "♦":
          return "🃅";
        case "♣":
          return "🃕";
        default:
          const _exhaustiveCheck: never = card.suit;
          return _exhaustiveCheck;
      }
    case "6":
      switch (card.suit) {
        case "♠":
          return "🂦";
        case "♥":
          return "🂶";
        case "♦":
          return "🃆";
        case "♣":
          return "🃖";
        default:
          const _exhaustiveCheck: never = card.suit;
          return _exhaustiveCheck;
      }
    case "7":
      switch (card.suit) {
        case "♠":
          return "🂧";
        case "♥":
          return "🂷";
        case "♦":
          return "🃇";
        case "♣":
          return "🃗";
        default:
          const _exhaustiveCheck: never = card.suit;
          return _exhaustiveCheck;
      }
    case "8":
      switch (card.suit) {
        case "♠":
          return "🂨";
        case "♥":
          return "🂸";
        case "♦":
          return "🃈";
        case "♣":
          return "🃘";
        default:
          const _exhaustiveCheck: never = card.suit;
          return _exhaustiveCheck;
      }
    case "9":
      switch (card.suit) {
        case "♠":
          return "🂩";
        case "♥":
          return "🂹";
        case "♦":
          return "🃉";
        case "♣":
          return "🃙";
        default:
          const _exhaustiveCheck: never = card.suit;
          return _exhaustiveCheck;
      }
    case "10":
      switch (card.suit) {
        case "♠":
          return "🂪";
        case "♥":
          return "🂺";
        case "♦":
          return "🃊";
        case "♣":
          return "🃚";
        default:
          const _exhaustiveCheck: never = card.suit;
          return _exhaustiveCheck;
      }
    case "J":
      switch (card.suit) {
        case "♠":
          return "🂫";
        case "♥":
          return "🂻";
        case "♦":
          return "🃋";
        case "♣":
          return "🃛";
        default:
          const _exhaustiveCheck: never = card.suit;
          return _exhaustiveCheck;
      }
    case "Q":
      switch (card.suit) {
        case "♠":
          return "🂭";
        case "♥":
          return "🂽";
        case "♦":
          return "🃍";
        case "♣":
          return "🃝";
        default:
          const _exhaustiveCheck: never = card.suit;
          return _exhaustiveCheck;
      }
    case "K":
      switch (card.suit) {
        case "♠":
          return "🂮";
        case "♥":
          return "🂾";
        case "♦":
          return "🃎";
        case "♣":
          return "🃞";
        default:
          const _exhaustiveCheck: never = card.suit;
          return _exhaustiveCheck;
      }
  }
}

// Implemented this way because some games like President have Aces or 2s as high cards.
function convertRankToStackComparable(rank: StandardPlayingCardRank): number {
  switch (rank) {
    case "A":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    case "10":
      return 10;
    case "J":
      return 11;
    case "Q":
      return 12;
    case "K":
      return 13;
  }
}

export function compareRankByStack(
  cardA: StandardPlayingCard,
  cardB: StandardPlayingCard
): number {
  const rankA = convertRankToStackComparable(cardA.rank);
  const rankB = convertRankToStackComparable(cardB.rank);
  return rankA - rankB;
}
