
import _HomePage from './components/home/_HomePage';
import DevFlag from './components/others/DevFlag';
import { ServerData } from './utils/ServerData';
import { photographyModel } from './utils/models';

async function pageData() {
  const data = new ServerData({ path: '/landing' });
  const res = await data.get();
  if (!res.ok) {
    throw new Error('Failed to fetch page data.')
  }
  return await res.json()
}


export default async function Home() {

  const data = await pageData()

  const list: photographyModel[] = data['photography'];
  const random = Math.floor(Math.random() * (list.length - 4));

  return (
    <main>
      <DevFlag />
      <_HomePage
        flutterProjects={data['flutter']}
        webProjects={data['web']}
        photography={[...list.slice(random, random + 4)]}
      />
    </main>
  );
}