export const entities = {
  LINK: (children, entity, { key }) => (
    <a key={key} href={entity.url}>
      {children}
    </a>
  ),
};
