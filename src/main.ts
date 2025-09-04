type Person = {
  readonly id: number,
  readonly name: string,
  birth_year: number,
  death_year?: number,
  biography: string,
  image: string;
};

type Nationality =
  | 'American'
  | 'British'
  | 'Australian'
  | 'Israeli-American'
  | ' South African'
  | 'French'
  | 'Indian'
  | 'Israeli'
  | 'Spanish'
  | 'South Korean'
  | 'Chinese';


type Actress = Person & {
  most_famous_movies: [string, string, string],
  awards: string,
  nationality: Nationality;
};

async function getActress(id: number): Promise<Actress | null> {

  try {
    const response = await fetch(`http://localhost:3333/actresses/${id}`);
    const obj: unknown = await response.json();
    if (!isActress(obj)) {
      throw new Error('Dati non validi');
    }
    return obj;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Errore Sconosciuto:', error);
    }
    return null;
  }
}

async function getActor(id: number): Promise<Actor | null> {

  try {
    const response = await fetch(`http://localhost:3333/actors/${id}`);
    const obj: unknown = await response.json();
    if (!isActor(obj)) {
      throw new Error('Dati non validi');
    }
    return obj;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Errore Sconosciuto:', error);
    }
    return null;
  }
}

function isPerson(data: unknown): data is Person {
  return (
    typeof data === 'object' && data !== null &&
    'id' in data && typeof data.id === 'number' &&
    'name' in data && typeof data.name === 'string' &&
    'birth_year' in data && typeof data.birth_year === 'number' &&
    (!("death_year" in data) || typeof data.death_year === "number") &&
    'biography' in data && typeof data.biography === 'string' &&
    'image' in data && typeof data.image === 'string'
  );
}

function isActress(data: unknown): data is Actress {
  if (
    isPerson(data) &&
    'most_famous_movies' in data &&
    data.most_famous_movies instanceof Array &&
    data.most_famous_movies.length === 3 &&
    data.most_famous_movies.every(m => typeof m === 'string') &&
    'awards' in data && typeof data.awards === 'string' &&
    'nationality' in data && typeof data.nationality === 'string'
  ) {
    return true;
  }
  return false;
}


function isActor(data: unknown): data is Actor {
  if (
    isPerson(data) &&
    'known_for' in data &&
    data.known_for instanceof Array &&
    data.known_for.length === 3 &&
    data.known_for.every(m => typeof m === 'string') &&
    'awards' in data &&
    data.awards instanceof Array &&
    (data.awards.length === 1 || data.awards.length === 2) &&
    data.awards.every(m => typeof m === 'string') &&
    'nationality' in data && typeof data.nationality === 'string'
  ) {
    return true;
  }
  return false;
}

async function getAllActresses(): Promise<Actress[]> {
  try {
    const response = await fetch(`http://localhost:3333/actresses`);
    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Dati non validi: Non è un array');
    }
    const result: Actress[] = data.filter(isActress);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Errore Sconosciuto:', error);
    }
    return [];
  }
}

async function getAllActors(): Promise<Actor[]> {
  try {
    const response = await fetch(`http://localhost:3333/actors`);
    const data: unknown = await response.json();
    if (!Array.isArray(data)) {
      throw new Error('Dati non validi: Non è un array');
    }
    const result: Actor[] = data.filter(isActor);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Errore Sconosciuto:', error);
    }
    return [];
  }
}


async function getActresses(listNumber: number[]): Promise<(Actress | null)[]> {
  try {
    return await Promise.all(listNumber.map(getActress));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Errore Sconosciuto:', error);
    }
    return [null];
  }
}

async function getActors(listNumber: number[]): Promise<(Actor | null)[]> {
  try {
    return await Promise.all(listNumber.map(getActor));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('Errore Sconosciuto:', error);
    }
    return [null];
  }
}

function createActress(data: Omit<Actress, 'id'>): Actress {
  return {
    id: Math.random() * 100,
    ...data
  };
}

function createActors(data: Omit<Actor, 'id'>): Actor {
  return {
    id: Math.random() * 100,
    ...data
  };
}

function updateActress(data: Actress, modifiche: Partial<Omit<Actress, 'id' | 'name'>>): Actress {
  return { ...data, ...modifiche };
}

function updateActor(data: Actor, modifiche: Partial<Omit<Actor, 'id' | 'name'>>): Actor {
  return { ...data, ...modifiche };
}

type Actor = Person & {
  known_for: [string, string, string],
  awards: [string] | [string, string];
  nationality: Nationality & 'New Zealand' | 'Hong Kong' | 'German' | 'Candian' | 'Irish';
};