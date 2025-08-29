import { getFigureById, getPostsByFigureId } from "@/data";
import { useParams } from "react-router";
import { InstagramEmbed } from "react-social-media-embed";

export default function Figure() {
  const { id } = useParams();
  const figure = id ? getFigureById(id) : undefined;
  const posts = id ? getPostsByFigureId(id) : [];

  if (!id || !figure) {
    return (
      <div>
        <h1>Figure Not Found</h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-4xl font-bold">{figure.name}</h1>
      {figure.role && <p>{figure.role}</p>}
      {figure.status && <p className="capitalize">{figure.status}</p>}
      {figure.description && <p>{figure.description}</p>}

      <div className="mt-4">
        <div dangerouslySetInnerHTML={{ __html: figure.content ?? "" }} />
      </div>

      <h2 className="text-lg font-bold my-4">Dedicated Posts</h2>
      {posts.length === 0 ? (
        <p>No posts recorded.</p>
      ) : (
        <div className="flex gap-4">
          {posts.map((e) => (
            <div key={e.id}>
              {e.type === "instagram" ? (
                <InstagramEmbed url={e.url} />
              ) : (
                <a href={e.url} target="_blank" rel="noreferrer">
                  View post
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
