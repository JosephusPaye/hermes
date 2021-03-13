// @ts-check

export function scrollIntoView(el) {
  const offsetTop = el.offsetTop;
  const height = el.offsetHeight;
  const parentScrollTop = el.parentElement.scrollTop;
  const parentOffsetHeight = el.parentElement.offsetHeight;

  const visible = visibleInParent(
    offsetTop,
    height,
    parentScrollTop,
    parentOffsetHeight
  );

  if (visible) {
    return;
  }

  scrollTo(el, offsetTop, height, parentScrollTop, parentOffsetHeight);
}

function visibleInParent(
  offsetTop,
  height,
  parentScrollTop,
  parentOffsetHeight
) {
  return (
    offsetTop >= parentScrollTop && offsetTop + height <= parentOffsetHeight
  );
}

function scrollTo(el, offsetTop, height, parentScrollTop, parentOffsetHeight) {
  if (offsetTop < parentScrollTop) {
    el.parentElement.scrollTop = offsetTop;
    return;
  }

  const parentScrollBottom = parentScrollTop + parentOffsetHeight;

  if (offsetTop + height > parentScrollBottom) {
    const diff = parentScrollBottom - (offsetTop + height);
    el.parentElement.scrollTop -= diff;
  }
}
