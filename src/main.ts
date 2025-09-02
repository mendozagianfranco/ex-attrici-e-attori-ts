type Person = {
  readonly id: number,
  readonly name:string,
  birth_year:number,
  death_year?: number,
  biography: string,
  image: string
}



type Actress = Person & {
  most_famous_movies:[string,string,string],
  awards:string,
  nationality: 'American'| 'British'| 'Australian'| 'Israeli-American'|' South African'| 'French'| 'Indian'| 'Israeli| Spanish'| 'South Korean'| 'Chinese'
}

async function getActress(id: number): Promise<Actress|null>{

  try{ const response = await fetch(`http://localhost:3333/actresses/${id}`)
  const obj: unknown = await response.json()
  if(!isActress(obj)){
    throw new Error('Dati non validi')
  }
  return obj
  }catch(error){
    if(error instanceof Error){
      console.error(error.message)
    }else {
      console.error('Errore Sconosciuto:',error)
    }
    return null
  }
}

function isActress(response: unknown): response is Actress{
  if(
    response && typeof response === 'object' && response !== null &&
    'id' in response && typeof response.id === 'number' &&
    'name' in response && typeof response.name === 'string' &&
    'birth_year' in response && typeof response.birth_year === 'number' &&
    (!("death_year" in response) || typeof response.death_year === "number") &&
    'biography' in response && typeof response.biography === 'string' &&
    'image' in response && typeof response.image === 'string' &&
    'most_famous_movies' in response && 
    response.most_famous_movies instanceof Array &&
    response.most_famous_movies.length === 3 && 
    response.most_famous_movies.every(m => typeof m === 'string')&&
    'awards' in response && typeof response.awards === 'string' &&
    'nationality' in response && typeof response.nationality === 'string'
  ){
    return true
  }
  return false
}

getActress(1)