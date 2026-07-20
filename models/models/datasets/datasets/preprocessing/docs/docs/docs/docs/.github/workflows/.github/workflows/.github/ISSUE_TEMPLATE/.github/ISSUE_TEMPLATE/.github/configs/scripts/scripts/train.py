#!/usr/bin/env python3
"""
===============================================================================
ACCESS-XR Training Script
===============================================================================

Author: ACCESS-XR Authors

Usage:
    python scripts/train.py
"""

from pathlib import Path
import random
import yaml
import numpy as np
import torch

# ---------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------

CONFIG_FILE = Path("configs/default.yaml")


def load_config():
    with CONFIG_FILE.open("r") as f:
        return yaml.safe_load(f)


# ---------------------------------------------------------------------
# Reproducibility
# ---------------------------------------------------------------------

def set_seed(seed):

    random.seed(seed)
    np.random.seed(seed)

    torch.manual_seed(seed)
    torch.cuda.manual_seed_all(seed)

    torch.backends.cudnn.deterministic = True
    torch.backends.cudnn.benchmark = False


# ---------------------------------------------------------------------
# Device
# ---------------------------------------------------------------------

def get_device(config):

    if config["runtime"]["device"] == "cpu":
        return torch.device("cpu")

    if torch.cuda.is_available():
        return torch.device("cuda")

    return torch.device("cpu")


# ---------------------------------------------------------------------
# Dataset
# ---------------------------------------------------------------------

def build_dataloaders(config):

    print("Preparing datasets...")

    train_loader = None
    val_loader = None

    # TODO
    # Implement dataset loading

    return train_loader, val_loader


# ---------------------------------------------------------------------
# Models
# ---------------------------------------------------------------------

def build_models(config, device):

    print("Loading gesture model...")

    gesture_model = None

    print("Loading speech model...")

    speech_model = None

    print("Loading fusion module...")

    fusion_model = None

    # TODO
    # Initialize actual models

    return gesture_model, speech_model, fusion_model


# ---------------------------------------------------------------------
# Optimizer
# ---------------------------------------------------------------------

def build_optimizer(models):

    parameters = []

    for model in models:

        if model is not None:
            parameters.extend(model.parameters())

    optimizer = torch.optim.Adam(
        parameters,
        lr=1e-4,
        weight_decay=1e-5,
    )

    return optimizer


# ---------------------------------------------------------------------
# Training
# ---------------------------------------------------------------------

def train_epoch(epoch,
                train_loader,
                models,
                optimizer,
                device):

    print(f"Epoch {epoch:03d} | Training")

    # TODO

    loss = 0.0

    return loss


# ---------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------

def validate(epoch,
             val_loader,
             models,
             device):

    print(f"Epoch {epoch:03d} | Validation")

    # TODO

    accuracy = 0.0

    return accuracy


# ---------------------------------------------------------------------
# Checkpoints
# ---------------------------------------------------------------------

def save_checkpoint(models,
                    optimizer,
                    epoch,
                    output_dir):

    output_dir.mkdir(exist_ok=True)

    checkpoint = {

        "epoch": epoch,

        "optimizer": optimizer.state_dict(),

    }

    torch.save(
        checkpoint,
        output_dir / f"checkpoint_epoch_{epoch}.pth",
    )


# ---------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------

def main():

    config = load_config()

    set_seed(config["runtime"]["seed"])

    device = get_device(config)

    print(f"Running on {device}")

    train_loader, val_loader = build_dataloaders(config)

    models = build_models(config, device)

    optimizer = build_optimizer(models)

    epochs = config.get("training", {}).get("epochs", 50)

    best_accuracy = 0.0

    checkpoint_dir = Path("checkpoints")

    for epoch in range(1, epochs + 1):

        train_loss = train_epoch(
            epoch,
            train_loader,
            models,
            optimizer,
            device,
        )

        accuracy = validate(
            epoch,
            val_loader,
            models,
            device,
        )

        print(
            f"Epoch {epoch:03d} "
            f"Loss={train_loss:.4f} "
            f"Accuracy={accuracy:.2f}"
        )

        save_checkpoint(
            models,
            optimizer,
            epoch,
            checkpoint_dir,
        )

        if accuracy > best_accuracy:

            best_accuracy = accuracy

            print("New best model.")


if __name__ == "__main__":
    main()
