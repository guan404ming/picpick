"use client";

import { useState } from "react";
import { ReactReader } from "react-reader";

type BookReaderProps = {
  pdf: {
    src: string;
  };
};

export default function BookReader({ pdf }: BookReaderProps) {
  const [location, setLocation] = useState<string | number>(0);

  return (
    <div style={{ height: "100vh" }}>
      <ReactReader
        url={pdf.src}
        location={location}
        locationChanged={(epubcfi: string) => setLocation(epubcfi)}
      />
    </div>
  );
}
