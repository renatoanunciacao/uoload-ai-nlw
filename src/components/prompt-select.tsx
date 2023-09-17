import {useState, useEffect} from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "./ui/select";
import { api } from '@/lib/axios';

interface Prompt {
    id: string,
    title: string,
    template: string
}

interface PrompSelectedProps{
    onPromptSelected: (template: string) => void
}
export function PromptSelect(props: PrompSelectedProps){
   const [prompts, setPrompts] = useState<Prompt[] | null>(null);

   useEffect(()=> {
    api.get('prompts').then((res)=> {
        setPrompts(res.data);
    })
   },[])


   function handlePromptSelected(promptId: string){
    const selectedPrompt = prompts?.find(prompt => prompt.id === promptId)

    if(!selectedPrompt){
        return
    }

    props.onPromptSelected(selectedPrompt.template);
   }

    return (
        <Select onValueChange={handlePromptSelected}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um prompt..." />
                </SelectTrigger>
                <SelectContent>
                    {prompts?.map((item) => {
                        return (
                            <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
                        )
                        })}
                </SelectContent>
              </Select>
    )
}