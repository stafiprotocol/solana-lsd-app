import { AnchorProvider, Program, setProvider } from "@coral-xyz/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { solanaPrograms } from "config";
import { IDL, LsdProgram } from "config/idl/lsd_program";
import { useEffect, useMemo } from "react";
import { PublicKey } from "@solana/web3.js";

export function useAnchorLsdProgram() {
  const wallet = useAnchorWallet();
  const { connection } = useConnection();

  const anchorLsdProgram = useMemo(() => {
    if (!wallet) {
      return undefined;
    }
    // @ts-ignore
    const provider = new AnchorProvider(connection, wallet, {});
    setProvider(provider);

    const programId = new PublicKey(solanaPrograms.lsdProgramId);
    const program = new Program<LsdProgram>(IDL, programId);

    return program;
  }, [connection, wallet]);

  return anchorLsdProgram;
}
