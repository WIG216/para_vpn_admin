/* eslint-disable @typescript-eslint/no-explicit-any */
type ListType<T> = {
  data: T[];
  renderer: (d: T, i: number) => any;
};

export default function List<T>({ data = [], renderer }: ListType<T>) {
  return <>{data.map<T>((d: T, i: number) => renderer(d, i))}</>;
}
