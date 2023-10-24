import { For } from "solid-js";
import { useAppState } from "./AppState";

export function Board(props) {
  return (
    <div class={props.class}>
      <For each={props.state.board}>
        {(row: string[], r) => (
          <div class={props.rowClass}>
            <For each={row}>
              {(col, c) => {
                const colorStyle = `background-color: ${col}`;
                return (
                  <div class={props.cellClass} style={colorStyle}>
                    &nbsp;
                  </div>
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
    <div class={props.class}>
      <div class={props.paletteList}>
        <For each={props.colors}>
          {(col: string, c) => {
            const colorStyle = `background-color: ${col}`;
            return (
              <div
                onClick={() => props.onChoose(col)}
                class={props.paletteCell}
                style={colorStyle}
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
    <ul class={props.class}>
      <li>
        <button onClick={props.onReset}>New</button>
      </li>
      <li>
        <button onClick={props.onRestart}>Restart</button>
      </li>
    </ul>
  );
}

export function WinText(props) {
  return <div class={props.class}>{props.win_text}</div>;
}
