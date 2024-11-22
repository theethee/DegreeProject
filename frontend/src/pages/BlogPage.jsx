import BlogPublic from "../components/blog/BlogPublic";
import NavigationBar from "../components/navbar/NavigationBar";

function BlogPage() {
  return (
    <>
      <div>
        <NavigationBar></NavigationBar>
      </div>
      <BlogPublic></BlogPublic>
    </>
  );
}

export default BlogPage;
