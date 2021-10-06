import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { AtSpinnerOverlay } from "../AtSpinner";
import { AtSlider } from "../Slider";
const wheel = {
  disabled: true,
  step: 10,
};
const zoomIn = {
  step: 10,
};
const zoomOut = {
  step: 10,
};

const ZoomImageViewer = (props) => {
  const { imageSrc, defaultZoom } = props;
  const [currentZoom, setCurrentZoom] = useState(8);

  const [loading, setLoading] = useState(true);
  const imageRef = useRef(null);
  const zoomRef = useRef(null);
  const options = {
    minScale: 0,
    maxScale: 3,
    limitToBounds: true,
    initialScale: currentZoom,
  };
  useEffect(() => {
    // resetTransform();
    const image = new Image();
    image.src = imageSrc;
    setLoading(true);
    image.onload = () => {
      try {
        imageRef.current.src = image.src;
        //zoomRef.current.centerView();
        window.transformREF = zoomRef;

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
  }, [imageSrc]);
  useEffect(() => {
    if (!defaultZoom || !parseFloat(defaultZoom)) return;
    console.log("useEffect -> defaultZoom", defaultZoom);
    if (defaultZoom >= options.minScale && defaultZoom <= options.maxScale) {
      //setCurrentZoom(defaultZoom);
    }
  }, [defaultZoom]);
  return (
    <>
      <div className={classNames("at-zoom-image-viewer-transformwrapper", { hidden: loading })}>
        <TransformWrapper
          id="at-viewer-wrapper"
          options={options}
          wheel={wheel}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          ref={zoomRef}
          initialScale={currentZoom}
          initialPositionX={0}
          initialPositionY={0}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <AtSlider
                isIdle={false}
                value={currentZoom>options.maxScale? options.maxScale: currentZoom}
                onRelease={(val) => {
                  const zoomval = Math.abs(currentZoom - val);
                  if (val < currentZoom) {
                    zoomOut(zoomval);
                  } else {
                    zoomIn(zoomval);
                  }
                  setCurrentZoom(val);
                }}
                min={options.minScale}
                max={options.maxScale}
                stepSize={1}
              />
              <TransformComponent>
                <img className="zoom-image" src={""} ref={imageRef} alt="test" />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
      {
        <AtSpinnerOverlay
          show={loading}
          className={classNames("atCenter popupSpinner", { hidden: !loading })}
        ></AtSpinnerOverlay>
      }
    </>
  );
};
export default ZoomImageViewer;
