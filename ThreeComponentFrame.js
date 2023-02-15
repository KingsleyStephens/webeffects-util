import { useEffect } from 'react';
import Frame, { useFrame } from 'react-frame-component';

function ThreeComponent( { componentType, componentParams, mountPoint }) {
    const { document } = useFrame();
  
    useEffect(() => {
      let demo = null;
      if (document) {
        let root = document.querySelector(mountPoint);
        if (root) {
          demo = new componentType(root, componentParams);
        }
      }
  
      return () => {
        if (demo) {
          demo.shutdown();
          demo = null;
        }
      }
    }, [document, componentType, componentParams, mountPoint]);
  
    return null;
}
  
function ThreeComponentFrame( { componentType, componentParams }) {
  let frameStyle = {
      position: 'fixed',
      width: '100%',
      height: '100%',
      left: '0',
      top: '0',
      zIndex: '-1',
      border: 'none',
      pointerEvents: 'none'
  };

  return (
          <Frame initialContent='<!DOCTYPE html><html><head></head><body><div id="mountHere"></div></body></html>' style={frameStyle}
            head={
              <style>{'*{position:fixed;margin:0px;width:100%;height:100%;left:0;top:0;border:none;}'}</style>
            }>
            <ThreeComponent componentType={componentType} componentParams={componentParams} mountPoint=".frame-content"/>
          </Frame>
  );
}

export { ThreeComponentFrame };