import "./newitem.css";
import { useMutation } from "react-query";
import postItem from "./postItem";
import cuteLoading from "../../assets/img/cute-loading.png";
import shiba from "../../assets/img/shiba.png";
import { useQueryClient } from "react-query";

function NewItem() {
  const queryClient = useQueryClient();

  const mutation = useMutation(postItem, {
    onSuccess: () => {
      queryClient.invalidateQueries(["items"]);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  if (mutation.isLoading) {
    return (
      <div className="loading-pane">
        <img className="loader" src={cuteLoading} alt="saucisse" />
      </div>
    );
  }
  return (
    <form
      className="newItem"
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const title = formData.get("title")?.toString() ?? "";
        const finalTitle = title.charAt(0).toUpperCase() + title.slice(1);
        const obj = {
          title: finalTitle,
          link: formData.get("link")?.toString() ?? "",
        };
        mutation.mutate(obj);
      }}
    >
      <label className="title" htmlFor="title">
        <input id="title" name="title" placeholder="Titre" />
      </label>

      <label className="link" htmlFor="link">
        <input id="link" name="link" placeholder="Lien" />
      </label>
      <button className="submit">
        <img className="shiba" src={shiba} alt="shiba" />
      </button>
    </form>
  );
}

export default NewItem;