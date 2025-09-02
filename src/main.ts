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
  const obj = await response.json()
  if(!isActress(obj)){
    throw new Error('Dati non validi')
  }
  return obj
  }catch(error){
    if(error instanceof Error){
      console.log(error.message)
    }else {
      console.error('Errore Sconosciuto:',error)
    }
    return null
  }
}

function isActress(response: unknown): response is Actress{
  if(response &&
    typeof response === 'object' &&
    'most_famous_movies' in response &&
    typeof response.most_famous_movies === 'object'&&
    'awards' in response &&
    typeof response.awards === 'string' &&
    'nationality' in response &&
    typeof response.nationality === 'string'
  ){
    return true
  }
  return false
}

getActress(1)