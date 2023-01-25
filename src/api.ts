// good read: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

// just in case we need to differentiate between prod and dev
export const domain =
  process.env.NODE_ENV === "production"
    ? "https://pokeapi.co/api/v2/"
    : "https://pokeapi.co/api/v2/";

const customFetch = async (
  route: string,
  options: { body?: any, conf?: any, params?: any } = {}
)  => {
  const { body, conf } = options;

  const searchQuery = "?" + new URLSearchParams(options.params).toString();

  const response = await fetch(domain + route, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    ...conf,
    body: body && JSON.stringify(body),
  });

  if (response.status !== 200) {
    const error = await response.text();
    if (process.env.NODE_ENV !== "production") {
      const w = window.open(undefined, "_blank");
      w!.document.write(error);
    }
    return { error };
  }

  return await response.json();
};

export const getPokemons = async (offset = 20, limit = 20) => {
  return await customFetch("pokemon", { params: { offset, limit } });
};

export const getPokemonDetail = async (id:number) => {
  return await customFetch(`pokemon/${id}`);
};

export const getPokemonSpeciesDetail = async (id:number) => {
  return await customFetch(`pokemon-species/${id}`);
};