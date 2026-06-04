"use client";
import Image from "next/image";
import { useState, useRef } from "react";
import InfiniteViewer from "react-infinite-viewer";

const IMG = "/services/eskuvo.jpg";

const TILE_W = 360;
const TILE_H = 480;
const GAP = 48;
const INIT = 6;
const APPEND = 2;

export default function Gallery() {
  const viewerRef = useRef(null);
  const [bounds, setBounds] = useState({
    colMin: -INIT / 2,
    colMax: INIT / 2,
    rowMin: -INIT / 2,
    rowMax: INIT / 2,
  });

  const handleScroll = () => {
    const viewer = viewerRef.current;
    if (!viewer) return;
    const x = viewer.getScrollLeft();
    const y = viewer.getScrollTop();
    const vw = viewer.getContainerWidth();
    const vh = viewer.getContainerHeight();
    const cw = viewer.getViewportWidth();
    const ch = viewer.getViewportHeight();
    const threshold = 400;

    setBounds((prev) => {
      let next = prev;
      if (y + vh + threshold > ch) next = { ...next, rowMax: next.rowMax + APPEND };
      if (x + vw + threshold > cw) next = { ...next, colMax: next.colMax + APPEND };
      if (y - threshold < 0) {
        next = { ...next, rowMin: next.rowMin - APPEND };
        queueMicrotask(() => viewer.scrollBy(0, APPEND * (TILE_H + GAP)));
      }
      if (x - threshold < 0) {
        next = { ...next, colMin: next.colMin - APPEND };
        queueMicrotask(() => viewer.scrollBy(APPEND * (TILE_W + GAP), 0));
      }
      return next;
    });
  };

  const cells = [];
  for (let c = bounds.colMin; c < bounds.colMax; c++) {
    for (let r = bounds.rowMin; r < bounds.rowMax; r++) {
      cells.push({ col: c, row: r });
    }
  }

  return (
    <section id="portfolio" className="bg-black w-full" style={{ height: "200vh" }}>
      <InfiniteViewer
        ref={viewerRef}
        className="w-full h-full bg-black"
        margin={0}
        threshold={0}
        useMouseDrag={true}
        useWheelScroll={true}
        useAutoZoom={false}
        rangeX={[-Infinity, Infinity]}
        rangeY={[-Infinity, Infinity]}
        onScroll={handleScroll}
      >
        <div
          className="relative"
          style={{
            width: (bounds.colMax - bounds.colMin) * (TILE_W + GAP),
            height: (bounds.rowMax - bounds.rowMin) * (TILE_H + GAP),
          }}
        >
          {cells.map((cell) => (
            <div
              key={`${cell.col}:${cell.row}`}
              className="absolute overflow-hidden"
              style={{
                left: (cell.col - bounds.colMin) * (TILE_W + GAP),
                top: (cell.row - bounds.rowMin) * (TILE_H + GAP),
                width: TILE_W,
                height: TILE_H,
              }}
            >
              <Image
                src={IMG}
                alt=""
                fill
                className="object-cover"
                sizes="360px"
              />
            </div>
          ))}
        </div>
      </InfiniteViewer>
    </section>
  );
}
