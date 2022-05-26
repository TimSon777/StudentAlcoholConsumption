export default function enumKeys<E>(e: E) {
  return Object.keys(e) as (keyof E)[];
}
