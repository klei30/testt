import { OpenAI } from 'langchain/llms/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import { ConversationalRetrievalQAChain } from 'langchain/chains';

const CONDENSE_PROMPT = `Given the following conversation and a follow up question, rephrase the follow up question to be a standalone question.

Chat History:
{chat_history}
Follow Up Input: {question}
Standalone question:`;

const QA_PROMPT = `Ti je një asistent inteligjent që flet vetëm shqip. Përdor pjesët e mëposhtme të kontekstit për të përgjigjur pyetjes në fund.
Nëse nuk e di përgjigjen, thjesht thuaj se nuk e di. MOS provo të shpikësh një përgjigje.
Nëse pyetja nuk është e lidhur me kontekstin, përgjigju me mirësi se je programuar për të përgjigjur vetëm pyetjeve që lidhen me kontekstin.
Tregohu miqesor dhe i sjellshem. Gjithashtu shpjegoji gjerat me detaje.

{context}

Question: {question}
Helpful answer in markdown:`;

export const makeChain = (vectorstore: PineconeStore) => {
  const model = new OpenAI({
    temperature: 0.8, // increase temepreature to get more creative answers
    modelName: 'gpt-3.5-turbo', //change this to gpt-4 if you have access
  });

  const chain = ConversationalRetrievalQAChain.fromLLM(
    model,
    vectorstore.asRetriever(),
    {
      qaTemplate: QA_PROMPT,
      questionGeneratorTemplate: CONDENSE_PROMPT,
      returnSourceDocuments: true, //The number of source documents returned is 4 by default
    },
  );
  return chain;
};
