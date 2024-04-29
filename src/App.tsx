import { useEffect, useState } from 'react';
import ColorfulMessage from './components/ColorfulMessage';

const App = () => {
  /**
   * 再レンダリングについて
   * - react18では、開発時のみ、StrictModeの際に２回コンポーネントがレンダリングされる
   * - stateが更新されると基本的に再レンダリングされる
   * - propsを受けとっているコンポーネントは、propsが更新された時も再レンダリングされる
   * - 親コンポーネントが再レンダリングされると、子コンポーネントも必ず再レンダリングされる
   */
  //
  console.log('--- App ---');
  const [num, setNum] = useState(0); // 関数コンポーネントの一番上の階層でしか呼べない（useState）onClickCountUpのなかでは使えない
  const [isShowFace, setIsShowFace] = useState(false);

  // カウントアップボタンクリック時
  const onClickCountUp = () => {
    /**
     * ポイント
     * 呼んだ瞬間に更新されるわけではない
     * setNum関数を2行連続て呼んでも、+1にしかならない
     * 関数終了時に、まとめて反映するので、２回目のnumも「0 + 1」になる
     */
    // setNum(num + 1); // 1回目
    // setNum(num + 1);  // 2回目
    /**
     * ポイント
     * set関数は、関数を受け取ることもできる
     * set関数の引数には、numの本当に今の値が入ってくる
     * なので、以下のような下記書き方になると、一回クリックしたら2カウントアップする
     */
    setNum((prev) => prev + 1);
    // setNum((prev) => prev + 1);

    // Appコンポーネントが再レンダリングされる
  };

  // 表示／非表示
  const onClickToggle = () => {
    setIsShowFace(!isShowFace);
    // フラグの更新を検知すると、Appコンポーネントが再レンダリングされる
  };

  useEffect(() => {
    console.log('--useEffect--');
    /**
     * useEffectの使い所についいて
     * - 再レンダリング時に実行したい処理の時のみuseEffectは使用する
     * - buttonで表示切り替えたいだけの時など
     * - ★★要確認
     */

    if (num > 0) {
      if (num % 3 === 0) {
        isShowFace || setIsShowFace(true);
      } else {
        isShowFace && setIsShowFace(false);
      }
    }
    /**
     * useEffect
     * - 第二引数が空配列の時は、最初のマウント時のみに実行
     * - 第二引数にstateを設定した時は、そのstateが更新された時に実行される
     */
  }, [num]); // 依存配列

  return (
    <>
      {/* 実際にはあんまりインラインスタイルは使わない */}
      <h1 style={{ color: '#000', fontWeight: 'normal' }}>こんにちは</h1>
      {/* -----タグで囲ったテキストをわたす方法----- */}
      <ColorfulMessage color="blue">お元気ですか</ColorfulMessage>
      <ColorfulMessage color="green">はい。元気です</ColorfulMessage>
      {/* -----propsでテキストをわたす方法----- */}
      {/* <ColorfulMessage color="red" message="げんきです" /> */}
      <button onClick={onClickCountUp}>カウントアップ</button>
      <p>{num}</p>
      <button onClick={onClickToggle}>表示／非表示</button>
      {isShowFace && <p>(*^ω^*)</p>}
    </>
  );
};

export default App;

// 初期表示
// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
// import './App.css';

// function App() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <div>
//         <p>wai</p>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   );
// }

// export default App;
