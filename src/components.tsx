import { For, createSignal } from "solid-js";
import { FloodItStrategy } from "./floodit.model";

export function Board(props) {
  return (
    <div class="board">
      <For each={props.state.board}>
        {(row: string[], r) => (
          <div class="boardrow">
            <For each={row}>
              {(col, c) => {
                return (
                  <div class={`boardcell aspect-square ${col}`}>&nbsp;</div>
                );
              }}
            </For>
          </div>
        )}
      </For>
    </div>
  );
}

export function Palette(props) {
  return (
    <div class="palette">
      <div class="palettelist">
        <For each={props.colors}>
          {(col: string, c) => {
            return (
              <div
                onClick={() => props.onChoose(col)}
                class={`palettecell ${col} rounded-full ring-2 ring-black hover:scale-125`}
              >
                &nbsp;
              </div>
            );
          }}
        </For>
      </div>
    </div>
  );
}

export function Toolbar(props) {
  const [newSize, setNewSize] = createSignal(
    FloodItStrategy.DEFAULT_BOARD_SIZE
  );
  const [newNumMoves, setNewNumMoves] = createSignal(
    FloodItStrategy.DEFAULT_MOVES_LIMIT
  );

  return (
    <div class="reset">
      <div class="text-lg">
        <div class="ml-40 text-left">
          <label class="pr-2" for="board-size">
            Board Size:
          </label>
          <input
            type="number"
            id="board-size"
            placeholder="Board size in squares; default is 14"
            value={newSize()}
            onInput={(e) => {
              const size = +e.currentTarget.value;
              setNewSize(size);
              setNewNumMoves(size * 2);
            }}
            min="10"
            max="20"
            size="2"
          />
          <button
            class="ml-2 p-1 rounded-lg scale-75 bg-blue-700 text-white hover:bg-blue-600 hover:text-[gold] hover:font-bold hover:scale-100"
            onClick={() => {
              setNewSize(FloodItStrategy.DEFAULT_BOARD_SIZE);
              setNewNumMoves(FloodItStrategy.DEFAULT_MOVES_LIMIT);
            }}
          >
            Reset
          </button>
        </div>
        <div class="ml-40 text-left">
          <label class="pr-2" for="num-moves">
            Number Moves:
          </label>
          <input
            type="number"
            id="num-moves"
            placeholder="Number of moves; default is 28"
            value={newNumMoves()}
            onInput={(e) => setNewNumMoves(+e.currentTarget.value)}
            min="10"
            max="30"
            size="2"
          />
        </div>
      </div>
      <ul class="mt-3 pt-3">
        <li>
          <button
            class="rounded-lg bg-blue-700 text-white hover:bg-blue-600 hover:text-[gold] hover:font-bold hover:scale-125"
            onClick={() => props.onNew(newSize(), newNumMoves())}
          >
            New
          </button>
        </li>
        <li>
          <button
            class="rounded-lg bg-blue-700 text-white hover:bg-blue-600 hover:text-[gold] hover:font-bold hover:scale-125"
            onClick={props.onRestart}
          >
            Restart
          </button>
        </li>
      </ul>
    </div>
  );
}

export function WinText(props) {
  return <div class="wintext pb-3 text-4xl">{props.win_text}</div>;
}
