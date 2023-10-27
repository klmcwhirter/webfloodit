import shuffle from "shuffle-array";

const COLOR_CHOICES = [
  "bg-black",
  "bg-gray-500",
  "bg-stone-300", // lightgray
  "bg-white",
  "bg-red-700",
  "bg-orange-400",
  "bg-[yellow]",
  "bg-[tan]",
  "bg-green-600",
  "bg-cyan-400",
  "bg-sky-200", // lightblue
  "bg-blue-700",
  "bg-violet-300",
  "bg-purple-800",
];

type BoardType = string[][];

export class FloodItStrategy {
  static DEFAULT_BOARD_SIZE = 14;
  static DEFAULT_MOVES_LIMIT = 28;
  static BOARD_SIZE = this.DEFAULT_BOARD_SIZE;
  static MOVES_LIMIT = this.DEFAULT_MOVES_LIMIT;
  move: number = 0;
  colors: string[];
  board: BoardType;
  win_text: string;

  board_size: number;
  color_choices: string[];
  moves_limit: number;

  constructor(model?: FloodItStrategy) {
    if (model) {
      this.move = model.move;
      this.color_choices = model.color_choices;
      this.colors = model.colors;
      this.board_size = model.board_size;
      this.board = JSON.parse(JSON.stringify(model.board));
      this.moves_limit = model.moves_limit;
      this.win_text = model.win_text;
    } else {
      this.color_choices = COLOR_CHOICES;
      this.board_size = FloodItStrategy.BOARD_SIZE;
      this.colors = [];
      this.board = [];
      this.win_text = "";
      this.moves_limit = FloodItStrategy.MOVES_LIMIT;
      this.reset();
      this.winCheck();
    }
  }

  _all_squares_are_the_same(): boolean {
    return this.board.flat().every((c) => c === this.board[0][0]);
  }

  choose(flood_color: string): void {
    const target = this.board[0][0];
    if (flood_color != target) {
      // don't count double-click as a turn
      this.move += 1;

      this.flood(0, 0, target, flood_color);
      this.winCheck();
    }
  }

  // Recursively floods adjacent squares
  flood(x: number, y: number, target: string, replacement: string): void {
    // Algorithm from https://en.wikipedia.org/wiki/Flood_fill
    if (target === replacement) {
      return;
    }

    if (this.board[x][y] !== target) {
      return;
    }

    this.board[x][y] = replacement;

    if (y + 1 <= this.board_size - 1) {
      this.flood(x, y + 1, target, replacement); // South
    }
    if (y - 1 >= 0) {
      this.flood(x, y - 1, target, replacement); // North
    }
    if (x + 1 <= this.board_size - 1) {
      this.flood(x + 1, y, target, replacement); // East
    }
    if (x - 1 >= 0) {
      this.flood(x - 1, y, target, replacement); // West
    }
  }

  winCheck(): void {
    if (this.move < this.moves_limit) {
      if (this._all_squares_are_the_same()) {
        this.win_text = "You win!";
      } else {
        this.win_text = `${this.moves_limit - this.move} moves left ...`;
      }
    } else {
      this.win_text = "You lost :(";
    }
  }

  fillBoard(): BoardType {
    const board: BoardType = [];
    for (const y in Array.from(Array(this.board_size).keys())) {
      const board_row: string[] = Array.from(Array(this.board_size).keys()).map(
        (x, i) => {
          return shuffle.pick(this.colors) as string;
        }
      );
      board.push(board_row);
    }
    return board;
  }

  reset() {
    this.colors = shuffle.pick(this.color_choices, { picks: 6 }) as string[];
    this.board = this.fillBoard();
  }
}
