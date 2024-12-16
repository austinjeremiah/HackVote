import * as anchor from '@coral-xyz/anchor'
import {Program} from '@coral-xyz/anchor'
import {Keypair, PublicKey} from '@solana/web3.js'
import { Votingdapp } from '../target/types/votingdapp';
import { BankrunProvider, startAnchor } from "anchor-bankrun";

const IDL = require('../target/idl/votingdapp.json');

const votingdappAddress = new PublicKey("coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF");

describe('votingdapp', () => {

  it('Initialize Poll', async () => {
    const context = await startAnchor("", [{ name: "votingdapp", programId: votingdappAddress}], []);
	  const provider = new BankrunProvider(context);

    const votingdappProgram = new Program<Votingdapp>(
      IDL,
      provider,
    );

    await votingdappProgram.methods.initializePoll(
        new anchor.BN(1),
        "Whats you favorite web3 ecosystem ?",
        new anchor.BN(1834365552),
        new anchor.BN(0),
       ).rpc();
  });

});
 
