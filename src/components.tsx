import { For } from "solid-js";

export function Board(props) {
  return (
    <div class="board">
      <For each={props.state.board}>
        {(row: string[], r) => (
          <div class="boardrow">
            <For each={row}>
              {(col, c) => {
                return <div class={`boardcell ${col}`}>&nbsp;</div>;
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
  return (
    <ul class="reset pt-3">
      <li>
        <button
          class="rounded-lg bg-blue-700 text-white hover:bg-blue-600 hover:text-[gold] hover:font-bold hover:scale-125"
          onClick={props.onNew}
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
  );
}

export function WinText(props) {
  return <div class="wintext pb-3 text-4xl">{props.win_text}</div>;
}
