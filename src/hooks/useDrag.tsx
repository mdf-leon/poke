import React, { useEffect, useRef } from "react";

function useDragger(draggableObject: React.RefObject<HTMLDivElement>, draggableArea: React.RefObject<HTMLDivElement> | null = null): void {

  const isClicked = useRef<boolean>(false);

  const dragCoordinates = useRef<{
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  }>({
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0
  })

  useEffect(() => {

    const dAreaRef = draggableArea?.current || draggableObject.current;
    if (!dAreaRef) throw new Error("Element with given id doesn't exist");
    
    const dObjectRef = draggableObject.current;
    if (!dObjectRef) throw new Error("Element with given id doesn't exist");

    const parent = dObjectRef.parentElement;
    if (!parent) throw new Error("target element must have a parent");

    dragCoordinates.current.lastX = dObjectRef.offsetLeft;
    dragCoordinates.current.lastY = dObjectRef.offsetTop;

    const onMouseDown = (e: MouseEvent) => {

      // stops selecting text on the background while moving
      if(e.stopPropagation) e.stopPropagation();
      if(e.preventDefault) e.preventDefault();

      isClicked.current = true;
      dragCoordinates.current.startX = e.clientX;
      dragCoordinates.current.startY = e.clientY;
    }

    const onMouseUp = (e: MouseEvent) => {
      isClicked.current = false;
      dragCoordinates.current.lastX = dObjectRef.offsetLeft;
      dragCoordinates.current.lastY = dObjectRef.offsetTop;
    }

    const onMouseMove = (e: MouseEvent) => {
      if (!isClicked.current) return;

      const nextX = e.clientX - dragCoordinates.current.startX + dragCoordinates.current.lastX;
      const nextY = e.clientY - dragCoordinates.current.startY + dragCoordinates.current.lastY;

      draggableObject.current!.style.top = `${nextY}px`;
      draggableObject.current!.style.left = `${nextX}px`;
    }

    dAreaRef.addEventListener('mousedown', onMouseDown);
    dAreaRef.addEventListener('mouseup', onMouseUp);
    parent.addEventListener('mousemove', onMouseMove);
    parent.addEventListener('mouseleave', onMouseUp);

    const cleanup = () => {
      dAreaRef.removeEventListener('mousedown', onMouseDown);
      dAreaRef.removeEventListener('mouseup', onMouseUp);
      parent.removeEventListener('mousemove', onMouseMove);
      parent.removeEventListener('mouseleave', onMouseUp);
    }

    return cleanup;
  }, [draggableObject])

}

export default useDragger;
