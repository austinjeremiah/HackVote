import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair, PublicKey} from '@solana/web3.js'
import { Votingdapp } from '../target/types/votingdapp';
import { BankrunProvider, startAnchor } from "anchor-bankrun";

const IDL = require('../target/idl/votingdapp.json');

const votingdappAddress = new PublicKey("4MFbPXXDsa62XnCaHdAijgScgPr2qaKi7cX6DZg1eTUb");

describe('votingdapp', () => {

  let context;
  let provider;
  let votingdappProgram: Program<Votingdapp>;



  beforeAll (async () => {

    context = await startAnchor("", [{ name: "votingdapp", programId: votingdappAddress}], []);
	  provider = new BankrunProvider(context);

    const votingdappProgram = new Program<Votingdapp>(
      IDL,
      provider,
    );

    });

  it('Initialize Poll', async () => {
    jest.setTimeout(30000);
    context = await startAnchor("", [{ name: "votingdapp", programId: votingdappAddress}], []);
	  provider = new BankrunProvider(context);

    votingdappProgram = new Program<Votingdapp>(
      IDL,
      provider,
    );

    await votingdappProgram.methods.initializePoll(
        new anchor.BN(1),
        "What is your favourite web3 ecosystem ?",
        new anchor.BN(0),
        new anchor.BN(1844365552),
        ).rpc();

        const [pollAddress] = PublicKey.findProgramAddressSync(
            [new anchor.BN(1).toArrayLike(Buffer,'le', 8)],
            votingdappAddress,
        )
        const Poll = await votingdappProgram.account.poll.fetch(pollAddress);
        console.log(Poll);
        expect(Poll.pollId.toNumber()).toEqual(1);
        expect(Poll.description).toEqual("What is your favourite web3 ecosystem ?");
        expect(Poll.pollStart.toNumber()).toBeLessThan(Poll.pollEnd.toNumber());

  });

  it("initialize_candidate", async () =>{
    await votingdappProgram.methods.initializeCanditate(
      "Solana",
      new anchor.BN(1)
  ).rpc();
  
  await votingdappProgram.methods.initializeCanditate(
      "Ethereum",
      new anchor.BN(1)
  ).rpc();

  const [solanaAddress] = PublicKey.findProgramAddressSync(
    [new anchor.BN(1).toArrayLike(Buffer,'le', 8), Buffer.from("Solana")],
     votingdappAddress,
  );
   const solanaCandidate = await votingdappProgram.account.canditate.fetch(solanaAddress);
   console.log(solanaCandidate);

   const [ethereumAddress] = PublicKey.findProgramAddressSync(
    [new anchor.BN(1).toArrayLike(Buffer,'le', 8), Buffer.from("Solana")],
     votingdappAddress,
  );
   const ethereumCandidate = await votingdappProgram.account.canditate.fetch(ethereumAddress);
   console.log(ethereumCandidate);

  });

  it("vote", async () =>{


    
  });


});
 
